import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  getTodos, 
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodo,
  updateSearch,
  updateFilters
} from '../../store/actions/todoActions'
import './todoList.css'

const TodoList = ({ todos, getTodos, addTodo, updateTodo, deleteTodo, toggleTodo, updateSearch, updateFilters }) => {
  const [newTodo, setNewTodo] = useState({
    description: '',
    priority: 'medium',
    category: 'general',
    dueDate: ''
  })
  const [editingTodo, setEditingTodo] = useState(null)
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  
  useEffect(() => {
    getTodos()
  }, [getTodos])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTodo({ ...newTodo, [name]: value })
  }
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditingTodo({ ...editingTodo, [name]: value })
  }
  
  const handleAddTodo = (e) => {
    e.preventDefault()
    
    if (!newTodo.description.trim()) return
    
    addTodo(newTodo)
    setNewTodo({
      description: '',
      priority: 'medium',
      category: 'general',
      dueDate: ''
    })
    setIsAddingTodo(false)
  }
  
  const handleSaveEdit = () => {
    if (!editingTodo.description.trim()) return
    
    updateTodo(editingTodo._id, editingTodo)
    setEditingTodo(null)
  }
  
  const handleToggleTodo = (id, done) => {
    toggleTodo(id, !done)
  }
  
  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(id)
    }
  }
  
  const handleSearch = (e) => {
    updateSearch(e.target.value)
  }
  
  const handleSortChange = (e) => {
    updateFilters({ sort: e.target.value })
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h1>My Tasks</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={todos.filters.search || ''}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="todo-actions">
        <button 
          className="add-todo-button"
          onClick={() => setIsAddingTodo(!isAddingTodo)}
        >
          {isAddingTodo ? 'Cancel' : 'Add New Task'}
        </button>
        
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort" 
            value={todos.filters.sort || '-createdAt'}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="-createdAt">Newest first</option>
            <option value="createdAt">Oldest first</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
            <option value="description">Alphabetical</option>
          </select>
        </div>
      </div>
      
      {isAddingTodo && (
        <form onSubmit={handleAddTodo} className="todo-form">
          <div className="form-group">
            <label htmlFor="description">Task Description *</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              required
              placeholder="What needs to be done?"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newTodo.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newTodo.category}
                onChange={handleInputChange}
                placeholder="Category"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTodo.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Task
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setIsAddingTodo(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {todos.loading && <div className="loading">Loading tasks...</div>}
      
      {todos.error && <div className="error-message">{todos.error}</div>}
      
      {!todos.loading && todos.list.length === 0 && (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>You don't have any tasks yet. Add a new task to get started!</p>
        </div>
      )}
      
      {!todos.loading && todos.list.length > 0 && (
        <ul className="todo-items">
          {todos.list.map(todo => (
            <li key={todo._id} className={`todo-item priority-${todo.priority} ${todo.done ? 'completed' : ''}`}>
              {editingTodo && editingTodo._id === todo._id ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-description">Task Description</label>
                    <input
                      type="text"
                      id="edit-description"
                      name="description"
                      value={editingTodo.description}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="edit-priority">Priority</label>
                      <select
                        id="edit-priority"
                        name="priority"
                        value={editingTodo.priority}
                        onChange={handleEditInputChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="edit-category">Category</label>
                      <input
                        type="text"
                        id="edit-category"
                        name="category"
                        value={editingTodo.category}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="edit-dueDate">Due Date</label>
                      <input
                        type="date"
                        id="edit-dueDate"
                        name="dueDate"
                        value={editingTodo.dueDate ? editingTodo.dueDate.substring(0, 10) : ''}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-notes">Notes</label>
                    <textarea
                      id="edit-notes"
                      name="notes"
                      value={editingTodo.notes || ''}
                      onChange={handleEditInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="edit-actions">
                    <button onClick={handleSaveEdit} className="save-button">
                      Save Changes
                    </button>
                    <button onClick={() => setEditingTodo(null)} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (                <React.Fragment>
                  <div className="todo-checkbox">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleToggleTodo(todo._id, todo.done)}
                      id={`todo-${todo._id}`}
                    />
                    <label htmlFor={`todo-${todo._id}`}></label>
                  </div>
                  
                  <div className="todo-content">
                    <div className="todo-info">
                      <h3 className={todo.done ? 'completed' : ''}>{todo.description}</h3>
                      <div className="todo-meta">
                        <span className={`priority priority-${todo.priority}`}>
                          {todo.priority}
                        </span>
                        {todo.category && (
                          <span className="category">{todo.category}</span>
                        )}
                        {todo.dueDate && (
                          <span className="due-date">
                            Due: {formatDate(todo.dueDate)}
                          </span>
                        )}
                      </div>
                      {todo.notes && (
                        <p className="todo-notes">{todo.notes}</p>
                      )}
                    </div>
                    
                    <div className="todo-actions">
                      <button
                        onClick={() => setEditingTodo(todo)}
                        className="edit-button"
                        aria-label="Edit task"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="delete-button"
                        aria-label="Delete task"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>                  </div>
                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({ 
    getTodos, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodo,
    updateSearch,
    updateFilters
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

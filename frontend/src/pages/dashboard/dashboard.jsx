import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodos } from '../../store/actions/todoActions'
import './dashboard.css'

const Dashboard = ({ todos, auth, getTodos }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      getTodos()
    }
  }, [auth.isAuthenticated, getTodos])

  // Calculate statistics
  const totalTasks = todos.list.length
  const completedTasks = todos.list.filter(todo => todo.done).length
  const pendingTasks = totalTasks - completedTasks
  const highPriorityTasks = todos.list.filter(todo => todo.priority === 'high' && !todo.done).length
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0

  // Get upcoming due tasks (next 3 days)
  const today = new Date()
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(today.getDate() + 3)
  
  const upcomingTasks = todos.list
    .filter(todo => {
      if (!todo.dueDate || todo.done) return false
      const dueDate = new Date(todo.dueDate)
      return dueDate >= today && dueDate <= threeDaysFromNow
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5)

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      
      {auth.user && (
        <div className="greeting">
          <h2>Welcome back, {auth.user.name}!</h2>
          <p>Here's an overview of your tasks</p>
        </div>
      )}
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-tasks"></i>
          </div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p className="stat-number">{totalTasks}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-number">{completedTasks}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-number">{pendingTasks}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon high-priority">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="stat-info">
            <h3>High Priority</h3>
            <p className="stat-number">{highPriorityTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <h3>Task Completion</h3>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${completionPercentage}%` }}
          >
            {completionPercentage > 0 && `${completionPercentage}%`}
          </div>
        </div>
        <p className="progress-text">
          You've completed {completedTasks} out of {totalTasks} tasks ({completionPercentage}%)
        </p>
      </div>
      
      <div className="upcoming-section">
        <h3>Upcoming Due Tasks</h3>
        {upcomingTasks.length > 0 ? (
          <ul className="upcoming-list">
            {upcomingTasks.map(task => {
              const dueDate = new Date(task.dueDate)
              const isToday = dueDate.toDateString() === today.toDateString()
              const isTomorrow = dueDate.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString()
              
              let dueDateText = dueDate.toLocaleDateString()
              if (isToday) dueDateText = 'Today'
              if (isTomorrow) dueDateText = 'Tomorrow'
              
              return (
                <li key={task._id} className={`upcoming-task priority-${task.priority}`}>
                  <div className="task-info">
                    <h4>{task.description}</h4>
                    <div className="task-meta">
                      <span className={`priority priority-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span className="category">{task.category}</span>
                    </div>
                  </div>
                  <div className="due-date">
                    Due: <strong>{dueDateText}</strong>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="no-tasks">You don't have any upcoming due tasks in the next 3 days.</p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  todos: state.todos,
  auth: state.auth
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({ getTodos }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

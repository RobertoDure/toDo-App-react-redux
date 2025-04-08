import axios from 'axios'
import { 
  TODO_LOADING,
  TODO_SUCCESS,
  TODO_ERROR,
  TODO_ADDED,
  TODO_UPDATED,
  TODO_DELETED,
  TODO_SEARCH_UPDATED,
  TODO_FILTER_UPDATED
} from '../reducers/todoReducer'

const API_URL = 'http://localhost:3003/api'

// Get all todos with optional filters
export const getTodos = () => async (dispatch, getState) => {
  dispatch({ type: TODO_LOADING })
  
  try {
    // Get filters from state
    const { filters } = getState().todos
    
    // Build query params
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    if (filters.done !== null) params.append('done', filters.done)
    if (filters.priority) params.append('priority', filters.priority)
    if (filters.category) params.append('category', filters.category)
    if (filters.dueBefore) params.append('dueBefore', filters.dueBefore)
    if (filters.dueAfter) params.append('dueAfter', filters.dueAfter)
    if (filters.sort) params.append('sort', filters.sort)
    
    const res = await axios.get(`${API_URL}/todos?${params.toString()}`)
    
    dispatch({
      type: TODO_SUCCESS,
      payload: res.data
    })
  } catch (err) {    dispatch({
      type: TODO_ERROR,
      payload: (err.response && err.response.data && err.response.data.message) || 'Failed to fetch todos'
    })
  }
}

// Add new todo
export const addTodo = (todoData) => async dispatch => {
  dispatch({ type: TODO_LOADING })
  
  try {
    const res = await axios.post(`${API_URL}/todos`, todoData)
    
    dispatch({
      type: TODO_ADDED,
      payload: res.data
    })
    
    return res.data
  } catch (err) {    dispatch({
      type: TODO_ERROR,
      payload: (err.response && err.response.data && err.response.data.message) || 'Failed to add todo'
    })
    return null
  }
}

// Update existing todo
export const updateTodo = (id, todoData) => async dispatch => {
  dispatch({ type: TODO_LOADING })
  
  try {
    const res = await axios.put(`${API_URL}/todos/${id}`, todoData)
    
    dispatch({
      type: TODO_UPDATED,
      payload: res.data
    })
    
    return res.data
  } catch (err) {    dispatch({
      type: TODO_ERROR,
      payload: (err.response && err.response.data && err.response.data.message) || 'Failed to update todo'
    })
    return null
  }
}

// Delete todo
export const deleteTodo = (id) => async dispatch => {
  dispatch({ type: TODO_LOADING })
  
  try {
    await axios.delete(`${API_URL}/todos/${id}`)
    
    dispatch({
      type: TODO_DELETED,
      payload: id
    })
    
    return true
  } catch (err) {    dispatch({
      type: TODO_ERROR,
      payload: (err.response && err.response.data && err.response.data.message) || 'Failed to delete todo'
    })
    return false
  }
}

// Toggle todo completion status
export const toggleTodo = (id, done) => async dispatch => {
  dispatch({ type: TODO_LOADING })
  
  try {
    const res = await axios.put(`${API_URL}/todos/${id}`, { done })
    
    dispatch({
      type: TODO_UPDATED,
      payload: res.data
    })
    
    return res.data
  } catch (err) {    dispatch({
      type: TODO_ERROR,
      payload: (err.response && err.response.data && err.response.data.message) || 'Failed to update todo status'
    })
    return null
  }
}

// Update search term
export const updateSearch = (searchTerm) => dispatch => {
  dispatch({
    type: TODO_SEARCH_UPDATED,
    payload: searchTerm
  })
  
  // Fetch todos with new search
  dispatch(getTodos())
}

// Update filters
export const updateFilters = (filters) => dispatch => {
  dispatch({
    type: TODO_FILTER_UPDATED,
    payload: filters
  })
  
  // Fetch todos with new filters
  dispatch(getTodos())
}

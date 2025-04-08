import axios from 'axios'
import { 
  AUTH_LOADING, 
  AUTH_SUCCESS, 
  AUTH_FAILURE, 
  AUTH_LOGOUT 
} from '../reducers/authReducer'

const API_URL = 'http://localhost:3003/api'

// Set Auth Token in headers
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

// Register User
export const register = (userData) => async dispatch => {
  dispatch({ type: AUTH_LOADING })
  
  try {
    const res = await axios.post(`${API_URL}/auth/register`, userData)
    
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
    
    setAuthToken(res.data.token)
    return true
  } catch (err) {    dispatch({
      type: AUTH_FAILURE,
      payload: (err.response && err.response.data && err.response.data.message) || 'Registration failed'
    })
    return false
  }
}

// Login User
export const login = (userData) => async dispatch => {
  dispatch({ type: AUTH_LOADING })
  
  try {
    const res = await axios.post(`${API_URL}/auth/login`, userData)
    
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
    
    setAuthToken(res.data.token)
    return true
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
      payload: err.response?.data?.message || 'Login failed'
    })
    return false
  }
}

// Validate Token & Load User
export const validateToken = () => async dispatch => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    dispatch({ type: AUTH_LOGOUT })
    return
  }
  
  setAuthToken(token)
  dispatch({ type: AUTH_LOADING })
  
  try {
    const res = await axios.get(`${API_URL}/user`)
    
    dispatch({
      type: AUTH_SUCCESS,
      payload: { token, user: res.data }
    })
  } catch (err) {
    dispatch({ type: AUTH_LOGOUT })
  }
}

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: AUTH_LOGOUT })
  setAuthToken(null)
}

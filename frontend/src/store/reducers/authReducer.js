// Authentication action types
export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
}

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      }
    case AUTH_FAILURE:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload
      }
    case AUTH_LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
      }
    default:
      return state
  }
}

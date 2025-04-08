// Action types
export const TODO_LOADING = 'TODO_LOADING'
export const TODO_SUCCESS = 'TODO_SUCCESS'
export const TODO_ERROR = 'TODO_ERROR'
export const TODO_ADDED = 'TODO_ADDED'
export const TODO_UPDATED = 'TODO_UPDATED'
export const TODO_DELETED = 'TODO_DELETED'
export const TODO_CLEAR = 'TODO_CLEAR'
export const TODO_SEARCH_UPDATED = 'TODO_SEARCH_UPDATED'
export const TODO_FILTER_UPDATED = 'TODO_FILTER_UPDATED'

// Initial state
const initialState = {
  list: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    done: null,
    priority: null,
    category: null,
    dueBefore: null,
    dueAfter: null,
    sort: '-createdAt'
  },
  categories: []
}

// Reducer
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: null
      }
    case TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case TODO_ADDED:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loading: false
      }
    case TODO_UPDATED:
      return {
        ...state,
        list: state.list.map(todo => 
          todo._id === action.payload._id ? action.payload : todo
        ),
        loading: false
      }
    case TODO_DELETED:
      return {
        ...state,
        list: state.list.filter(todo => todo._id !== action.payload),
        loading: false
      }
    case TODO_CLEAR:
      return {
        ...state,
        list: [],
        loading: false,
        error: null
      }
    case TODO_SEARCH_UPDATED:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload
        }
      }
    case TODO_FILTER_UPDATED:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      }
    default:
      return state
  }
}

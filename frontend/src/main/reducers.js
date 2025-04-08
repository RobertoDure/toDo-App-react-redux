import { combineReducers } from 'redux'
import authReducer from '../store/reducers/authReducer'
import todoReducer from '../store/reducers/todoReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer
})

export default rootReducer

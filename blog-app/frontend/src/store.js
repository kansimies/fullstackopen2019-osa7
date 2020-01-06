import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogsReducer,
  users: usersReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
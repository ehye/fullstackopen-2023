import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store

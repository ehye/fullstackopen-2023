import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import loginReducer from './loginReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    blog: blogReducer,
    notification: notificationReducer,
  },
})

export default store

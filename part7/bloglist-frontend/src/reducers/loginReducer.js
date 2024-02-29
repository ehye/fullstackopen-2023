import { createSlice } from '@reduxjs/toolkit'
import { showNotificationOf } from '../reducers/notificationReducer'
import { onGetAllUsers } from './userReducer'
import { onInitializeBlogs } from './blogReducer'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    onLogin(state, action) {
      if (action.payload) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(action.payload))
        return action.payload
      }
    },
    onLogout(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      return null
    },
  },
})

export const { onLogin, onLogout } = loginSlice.actions

export const login = ({ username, password }) => {
  return dispatch => {
    loginService
      .login({
        username,
        password,
      })
      .then(res => {
        dispatch(onLogin(res))
        dispatch(onInitializeBlogs())
        dispatch(onGetAllUsers())
      })
      .catch(({ response }) => {
        dispatch(showNotificationOf(response.data.error))
      })
  }
}

export default loginSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { showNotificationOf } from '../reducers/notificationReducer'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'loginUser',
  initialState: [],
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      window.location.reload()
    },
  },
})

export const { logout } = loginSlice.actions

export const login = ({ username, password }) => {
  return dispatch => {
    loginService
      .login({
        username,
        password,
      })
      .then(res => {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(res))
        window.location.reload()
      })
      .catch(({ response }) => {
        dispatch(showNotificationOf(response.data.error))
      })
  }
}

export default loginSlice.reducer

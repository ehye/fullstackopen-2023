import { createSlice } from '@reduxjs/toolkit'
import { showNotificationOf } from '../reducers/notificationReducer'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    onLogin(state, action) {
      if (action.payload) {
        console.log(action.payload)
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(action.payload))
        return action.payload
      }
      // window.location.reload()
    },
    onLogout(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      // window.location.reload()
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
      })
      .catch(({ response }) => {
        dispatch(showNotificationOf(response.data.error))
      })
  }
}

export default loginSlice.reducer

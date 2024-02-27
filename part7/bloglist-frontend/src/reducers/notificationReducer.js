import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const showNotificationOf = (content, timeout = 5) => dispatch => {
  dispatch(showNotification(content))
  setTimeout(() => {
    dispatch(removeNotification())
  }, timeout * 1000)
}

export default notificationSlice.reducer

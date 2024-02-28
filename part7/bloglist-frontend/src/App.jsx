import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onInitializeBlogs } from './reducers/blogReducer'
import { onLogin } from './reducers/loginReducer'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserPanel from './components/UserPanel'

import blogService from './services/blogs'
import './index.css'

const App = () => {
  const user = useSelector(({ login }) => login)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      dispatch(onLogin(user))
      blogService.setToken(user.token)
      dispatch(onInitializeBlogs())
    }
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      {!user && (() => <LoginForm />)()}
      {user && (
        <div>
          <UserPanel />
          <Notification />
          <BlogList user={user} />
          <BlogForm blogFormRef={blogFormRef} />
        </div>
      )}
    </div>
  )
}

export default App

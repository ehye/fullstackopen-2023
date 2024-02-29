import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { onInitializeBlogs } from './reducers/blogReducer'
import { onLogin } from './reducers/loginReducer'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserPanel from './components/UserPanel'
import Users from './components/Users'

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
      dispatch(onLogin(user))
      blogService.setToken(user.token)
      dispatch(onInitializeBlogs())
    }
  }, [dispatch])

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>
        <h2>blogs</h2>
        <UserPanel />

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div>
                  <Notification />
                  <BlogList user={user} />
                  <BlogForm blogFormRef={blogFormRef} />
                </div>
              ) : (
                (() => <LoginForm />)()
              )
            }
          />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

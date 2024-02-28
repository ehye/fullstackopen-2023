import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onInitializeBlogs } from './reducers/blogReducer'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [user, setUser] = useState(null)
  // const blogs = useSelector(({ blogs }) => blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log(user)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(onInitializeBlogs())
    }
  }, [dispatch])

  const loginForm = () => <LoginForm />

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button id="button-logout" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Notification />
          <BlogList user={user} />
          <BlogForm blogFormRef={blogFormRef} />
        </div>
      )}
    </div>
  )
}

export default App

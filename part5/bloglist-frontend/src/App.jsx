import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [addedMessage, setAddedMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      window.location.reload()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setAddedMessage(
        'a new blog ' +
          createdBlog.title +
          ' by ' +
          createdBlog.author +
          ' added'
      )
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <ErrorNotification error={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addBlogForm = () => (
    <div>
      <Togglable
        buttonLabel="add new"
        toggleButtonLabel="cancel"
        ref={blogFormRef}
      >
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ErrorNotification error={errorMessage} />
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>blogs</h2>
          <Notification message={addedMessage} />
          <ul>
            {blogs.map((blog, i) => (
              <Blog key={i} blog={blog} token={user.token} />
            ))}
          </ul>
          {addBlogForm()}
        </div>
      )}
    </div>
  )
}

export default App

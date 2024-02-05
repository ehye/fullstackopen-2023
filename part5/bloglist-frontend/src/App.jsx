import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  // const [showAll, setShowAll] = useState(true)
  // const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    // const blogObject = {
    //   content: newNote,
    //   important: Math.random() > 0.5,
    // }

    // noteService.create(blogObject).then((returnedNote) => {
    //   setNotes(notes.concat(returnedNote))
    //   setNewNote('')
    // })
  }

  const loginForm = () => (
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
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={newBlog} onChange={handleBlogChange} />
        </div>
        <div>
          author: <input value={newBlog} onChange={handleBlogChange} />
        </div>
        <div>
          url: <input value={newBlog} onChange={handleBlogChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  return (
    <div>
      {/* <Notification message={errorMessage} /> */}

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>blogs</h2>
          <ul>
            {blogs.map((blog, i) => (
              <Blog key={i} blog={blog} />
            ))}
          </ul>
          {blogForm()}
        </div>
      )}
      {/* <Footer /> */}
    </div>
  )
}

export default App

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
    console.log(user)
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  )

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

  return (
    <div>
      {/* <Notification message={errorMessage} /> */}

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
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

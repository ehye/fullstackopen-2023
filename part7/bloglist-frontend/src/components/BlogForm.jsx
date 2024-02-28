import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { onCreateBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const { reset: resetNewTitle, ...newTitle } = useField('newTitle')
  const { reset: resetNewAuthor, ...newAuthor } = useField('newAuthor')
  const { reset: resetNewUrl, ...newUrl } = useField('newUrl')
  const dispatch = useDispatch()

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
    }
    dispatch(onCreateBlog(blogObject))
    resetNewTitle()
    resetNewAuthor()
    resetNewUrl()
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="add new" toggleButtonLabel="cancel" ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id="input-title" type="text" {...newTitle} />
        </div>
        <div>
          author: <input id="input-author" type="text" {...newAuthor} />
        </div>
        <div>
          url: <input id="input-url" type="text" {...newUrl} />
        </div>
        <button id="button-createBlog" type="submit">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm

import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { createBlogOf } from '../reducers/blogReducer'
import { Table, Form, Button } from 'react-bootstrap'

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
    dispatch(createBlogOf(blogObject))
    resetNewTitle()
    resetNewAuthor()
    resetNewUrl()
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="add new" toggleButtonLabel="cancel" ref={blogFormRef}>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control id="input-title" type="text" {...newTitle} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control id="input-author" type="text" {...newAuthor} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control id="input-url" type="text" {...newUrl} />
        </Form.Group>
        <Button variant="primary" id="button-createBlog" type="submit">
          create
        </Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm

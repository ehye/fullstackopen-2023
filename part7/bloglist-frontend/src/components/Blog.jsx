import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useMatch } from 'react-router-dom'
import { useField } from '../hooks'
import { likeBlogOf, removeBlogOf, makeCommentOf } from '../reducers/blogReducer'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const id = useParams().id
  const blog = match ? blogs.find(b => b.id === id) : null
  const user = useSelector(({ login }) => login)
  const { reset: resetComment, ...comment } = useField('comment')

  const handleLikes = () => {
    dispatch(likeBlogOf(blog))
  }

  const handleComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment) {
      dispatch(makeCommentOf({ id: blog.id, comment: comment }))
    }
    resetComment()
  }

  const isRemovable = () => {
    user.id === blog.user?.id
  }

  const removeButton = blog => (
    <Button
      variant="danger"
      id="button-remove"
      onClick={() => {
        dispatch(removeBlogOf(blog))
        navigate('/')
      }}
    >
      remove
    </Button>
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button id="btn-likes" onClick={handleLikes}>
          like
        </Button>
      </div>
      <div>added by {blog.author}</div>
      {isRemovable && removeButton(blog)}

      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input id="comment" {...comment} />
        <button id="btn-comment" type="submit">
          add comment
        </button>
      </form>
      {blog.comments && [...blog.comments].map((comment, i) => <ul key={i}>{comment}</ul>)}
    </div>
  )
}

export default Blog

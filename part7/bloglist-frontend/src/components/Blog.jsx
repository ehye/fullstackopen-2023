import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlogOf, removeBlogOf } from '../reducers/blogReducer'

const Blog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(({ login }) => login)

  const handleLikes = async () => {
    dispatch(likeBlogOf(blog))
  }

  const isRemovable = () => {
    user.id === blog.user?.id
  }

  const removeButton = blog => (
    <button
      id="button-remove"
      onClick={() => {
        dispatch(removeBlogOf(blog))
        navigate('/')
      }}
    >
      remove
    </button>
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button id="btn-likes" onClick={handleLikes}>
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      {isRemovable && removeButton(blog)}
    </div>
  )
}

export default Blog

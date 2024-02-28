import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import { onCreateBlog } from '../reducers/blogReducer'

const compareLikes = (a, b) => b.likes - a.likes

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  const updateLikesOf = async blogObject => {
    const updatedBlog = {
      user: blogObject.user.id,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    }
    const res = await blogService.update(blogObject.id, updatedBlog)
    return res
  }

  const removeBlogOf = async blogObject => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.remove(blogObject.id)
      // const blogs = await blogService.getAll()
      // dispatch(removeBlog(blogObject.id))
      // setBlogs(blogs)
    }
  }

  return (
    <div>
      <ul>
        {[...blogs].sort(compareLikes).map((blog, i) => (
          <Blog
            key={i}
            blog={blog}
            // updateLikes={() => updateLikesOf(blog)}
            // removeBlog={() => removeBlogOf(blog)}
            isRemovable={user.id === blog.user?.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default BlogList

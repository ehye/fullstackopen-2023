import { useSelector } from 'react-redux'
import Blog from './Blog'

const compareLikes = (a, b) => b.likes - a.likes

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div>
      <ul>
        {[...blogs].sort(compareLikes).map((blog, i) => (
          <Blog key={i} blog={blog} isRemovable={user.id === blog.user?.id} />
        ))}
      </ul>
    </div>
  )
}

export default BlogList

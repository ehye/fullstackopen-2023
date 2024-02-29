import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const compareLikes = (a, b) => b.likes - a.likes

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div>
      <ul>
        {[...blogs].sort(compareLikes).map((blog, i) => (
          <div key={i}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BlogList

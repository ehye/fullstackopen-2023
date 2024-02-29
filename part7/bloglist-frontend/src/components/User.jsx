import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(({ users }) => users)
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h3>added blogs</h3>
      {[...user.blogs].map((blog, i) => (
        <ul key={i}>{blog.title}</ul>
      ))}
    </div>
  )
}

export default User

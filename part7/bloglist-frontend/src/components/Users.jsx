import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onGetAllUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onGetAllUsers())
  }, [dispatch])

  const users = useSelector(({ users }) => users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">blogs</th>
          </tr>
        </thead>
        <tbody>
          {[...users].map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

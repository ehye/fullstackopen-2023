import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { onLogout } from '../reducers/loginReducer'

const UserPanel = () => {
  const user = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(onLogout())
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to={`/users/${user.id}`}>
        {user.name}
      </Link>
      <button id="button-logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default UserPanel

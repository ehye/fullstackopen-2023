import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
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
  const inline = {
    display: 'inline-block',
  }

  return (
    <div style={inline}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <Button id="button-logout" variant="link" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default UserPanel

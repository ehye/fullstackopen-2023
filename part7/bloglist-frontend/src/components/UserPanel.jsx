import { useSelector, useDispatch } from 'react-redux'
import { onLogout } from '../reducers/loginReducer'

const UserPanel = () => {
  const user = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(onLogout())
  }

  return (
    <p>
      {user.name} logged in{' '}
      <button id="button-logout" onClick={handleLogout}>
        logout
      </button>
    </p>
  )
}

export default UserPanel

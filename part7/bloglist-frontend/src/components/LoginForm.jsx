import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'
import ErrorNotification from './ErrorNotification'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('username')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login({ username: event.target.username.value, password: event.target.password.value }))
    event.target.username.value = ''
    event.target.password.value = ''
    // window.location.reload()
  }

  return (
    <div>
      <ErrorNotification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" {...username} value="mluukkai" />
        </div>
        <div>
          password
          <input id="password" type="password" {...password} value="salainen" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

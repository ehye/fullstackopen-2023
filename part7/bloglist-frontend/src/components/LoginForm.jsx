import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Navigate } from 'react-router-dom'
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
  }

  return (
    <div>
      <ErrorNotification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" {...username} />
        </div>
        <div>
          password
          <input id="password" type="password" {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

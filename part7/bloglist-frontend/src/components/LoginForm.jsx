import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'
import ErrorNotification from './ErrorNotification'
import { Table, Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control id="username" type="text" {...username} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control id="password" type="password" {...password} />
        </Form.Group>
        <Button variant='primary' id="login-button" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm

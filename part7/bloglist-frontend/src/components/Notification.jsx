import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const notification = useSelector(({ notification }) => notification)

  if (notification === '') {
    return
  } else {
    return <Alert variant="success">{notification}</Alert>
  }
}

export default Notification

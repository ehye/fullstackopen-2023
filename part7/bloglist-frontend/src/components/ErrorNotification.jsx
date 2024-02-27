import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification === '') {
    return
  } else {
    return <div className="error">{notification}</div>
  }
}

export default ErrorNotification

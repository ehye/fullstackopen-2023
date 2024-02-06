const Notification = ({ message }) => {
  if (message === null || message === '') {
    return null
  }

  return <h1>{message}</h1>
}

export default Notification

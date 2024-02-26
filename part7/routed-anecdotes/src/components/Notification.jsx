export const Notification = ({ anecdote }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (anecdote === '') {
    return
  } else {
    return <div style={style}>a new anecdote {anecdote.content} created!</div>
  }
}

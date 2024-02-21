import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    if (event.target.content.value !== '') {
      event.preventDefault()
      dispatch(createAnecdote(event.target.content.value))

      dispatch(
        showNotification("You created '" + event.target.content.value + "'")
      )
      event.target.content.value = ''
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      event.target.content.value = ''
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" id="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

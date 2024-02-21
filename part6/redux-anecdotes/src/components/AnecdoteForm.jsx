import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    if (event.target.content.value !== '') {
      const content = event.target.content.value
      event.target.content.value = ''
      const newAnecdote = await anecdotesService.createNew(content)
      dispatch(createAnecdote(newAnecdote))

      dispatch(showNotification("You created '" + content + "'"))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
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

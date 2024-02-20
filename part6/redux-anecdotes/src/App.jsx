import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    if (event.target.content.value !== '') {
      const content = event.target.content.value
      event.target.content.value = ''
      dispatch(createAnecdote(content))
    }
  }

  const compareVotes = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App

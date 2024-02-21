import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))

    dispatch(showNotification("You voted '" + anecdote.content + "'"))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const compareVotes = (a, b) => b.votes - a.votes

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return [...anecdotes]
    } else {
      return [...anecdotes].filter((a) => a.content.match(filter))
    }
  })

  return (
    <div>
      <Filter />
      {anecdotes.sort(compareVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

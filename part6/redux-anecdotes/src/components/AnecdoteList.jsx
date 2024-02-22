import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { showNotificationOf } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotificationOf(`You voted '${anecdote.content}'`, 10))
  }

  const compareVotes = (a, b) => b.votes - a.votes

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter((a) => a.content.match(filter))
    }
  })

  return (
    <div>
      <Filter />
      {[...anecdotes].sort(compareVotes).map((anecdote) => (
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

import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    console.log(filter)
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter((a) => a.content.match(filter))
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const compareVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <Filter />
      {anecdotes.sort(compareVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button id={anecdote.id} onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

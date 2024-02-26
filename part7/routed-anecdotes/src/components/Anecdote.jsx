import { useParams } from 'react-router-dom'

export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === Number(id))
  return <div>{anecdote.content}</div>
}

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [index, setIndex] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))
  const [most, setMost] = useState(0)

  const nextAnecdote = () => {
    setIndex(Math.floor(Math.random() * (anecdotes.length)))
  }

  const addVote = () => {
    const copy = { ...votes }
    copy[index] += 1
    setVote(copy)
    console.log("index:", index, "votes[index]:", votes[index], "most:", most, "votes[most]:", votes[most]);
    if (votes[index] >= votes[most]) {
      setMost(index);
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[index]}</div>
      <div>has {votes[index]} votes</div>
      <button onClick={addVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[most]}</div>
      <div>has {votes[most]} votes</div>
    </div>
  )
}

export default App
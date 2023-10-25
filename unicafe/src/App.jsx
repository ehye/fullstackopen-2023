import { useState } from 'react'

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    return setGood(good + 1)
  }
  const addNeutral = () => {
    return setNeutral(neutral + 1)
  }
  const addBad = () => {
    return setBad(bad + 1)
  }

  const Display = ({ text, counter }) =>
    <div>{text} {counter}</div>

  const Display1 = ({ text, counter }) =>
    <div>{text} {counter} %</div>

  const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>{text}</button>

  const all = good + neutral + bad
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={addGood} />
      <Button text="neutral" handleClick={addNeutral} />
      <Button text="bad" handleClick={addBad} />
      <h1>statistics</h1>
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
      <Display text="all" counter={all} />
      <Display text="average" counter={(good - bad) / all} />
      <Display1 text="positive" counter={100 * good / all} />
    </div>
  )
}

export default App
import { useState } from 'react'

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByone = () => {
    return setGood(good + 1)
  }
  const decreaseByone = () => {
    return setNeutral(neutral + 1)
  }
  const setToZero = () => {
    return setBad(bad + 1)
  }

  const Display = ({ text, counter }) => 
    <div>{text} {counter}</div>

  const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>{text}</button>

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={increaseByone} />
      <Button text="neutral" handleClick={decreaseByone} />
      <Button text="bad" handleClick={setToZero} />
      <h1>statistics</h1>
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
    </div>
  )
}

export default App
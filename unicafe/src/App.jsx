import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const Display = ({ text, counter }) =>
    <div>{text} {counter}</div>

  const Display1 = ({ text, counter }) =>
    <div>{text} {counter} %</div>

  return (
    <div>
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

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const App = () => {

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={addGood} />
      <Button text="neutral" handleClick={addNeutral} />
      <Button text="bad" handleClick={addBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
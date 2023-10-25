import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad

  const StatisticLine = ({ text, value }) => {
    if (text == "positive") {
      return <tr><td>{text}</td><td>{value} %</td></tr>
    }
    else {
      return <tr><td>{text}</td><td>{value}</td></tr>
    }
  }

  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(good - bad) / all} />
            <StatisticLine text="positive" value={100 * good / all} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
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
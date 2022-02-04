import React, { useState } from 'react'

const Header = () => <div><h1>We would love to hear your feedback</h1></div>

const Button = (props) => {
  return (
      <button className='btn' onClick={props.onclick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}  </td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistics = (props) => {
  let good = props.stats.good
  let neutral = props.stats.neutral
  let bad = props.stats.bad
  let positive = good + neutral
  let totalVotes = good + neutral + bad
  let totalFeedback = good + neutral + bad
  let averageScore = (good + neutral + bad)/3
  let percentagePositive = (positive * 100)/ totalVotes



  if (good===0 && neutral===0 && bad===0){
    return (
      <div>
        <h3>No feedback given.</h3>
      </div>
    )
  } else {
    return (
      <div>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total Feedback " value={totalFeedback} />
        <StatisticLine text="Average score " value={averageScore} />
        <StatisticLine text="percentagePositive " value={percentagePositive + '%'} />
      </div>
    )
  } 
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicks = () => setGood(good + 1)

  const neutralClicks = () => setNeutral(neutral + 1)

  const badClicks = () => setBad(bad + 1)

  const stats = {
    good:good,
    neutral:neutral,
    bad:bad
  }

  return (
    <div>
      <Header />
      <Button text="Good" onclick={goodClicks} />
      <Button text="Neutral" onclick={neutralClicks}/>
      <Button text="Bad" onclick={badClicks}/>
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}


export default App
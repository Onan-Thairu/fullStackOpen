import React, { useState } from 'react'

const Header = () => <div><h1>We would love to hear your feedback</h1></div>

const Button = (props) => {
  return (
      <button className='btn' onClick={props.onclick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <div>
      <p>{props.text}: {props.count}</p>
    </div>
  )
}

const Statistics = (props) => {
  let good = props.stats.good
  let neutral = props.stats.neutral
  let bad = props.stats.bad
  let positive = good + neutral
  let totalVotes = good + neutral + bad

  if (good===0 && neutral===0 && bad===0){
    return (
      <div>
        <h3>No feedback given.</h3>
      </div>
    )
  } else {
    return (
      <div>
        <p>Total feedback: {good + neutral + bad}</p>
        <p>Average score: {(good + neutral + bad)/3}</p>
        <p>Positive: {(positive * 100)/ totalVotes} %</p>
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
      <Display text="Good" count={good} />
      <Display text="Neutral" count={neutral} />
      <Display text="Bad" count={bad} />
      <Statistics stats={stats} />
    </div>
  )
}


export default App
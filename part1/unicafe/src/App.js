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

const Total = (props) => {
  return (
    <div>
      <p>Total feedback: {props.good + props.neutral + props.bad}</p>
    </div>
  )
}

const Average = (props) => {
  return (
    <div>
      <p>Average score: {(props.good + props.neutral + props.bad)/3}</p>
    </div>
  )
}

const Positive = (props) => {
  let good = props.good + props.neutral
  let totalVotes = props.good + props.neutral + props.bad

  return (
    <div>
      <p>Positive: {(good * 100)/ totalVotes} %</p>
    </div>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicks = () => setGood(good + 1)

  const neutralClicks = () => setNeutral(neutral + 1)

  const badClicks = () => setBad(bad + 1)

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
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App
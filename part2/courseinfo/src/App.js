import React from 'react'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} - {props.part.exercises} </p>
    </div>
  )
}

const Content = ({course}) => {
  return course.parts.map((part) => <Part key={part.id} part={part} />)
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) =>sum + part.exercises, 0)
  return (
    <div>
      <p>Total of {total} exercises.</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name:'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Array mapping',
      exercises: 13,
      id:4
    }
  ]
}

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

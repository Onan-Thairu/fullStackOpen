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
  return (
    <div>
      <p>The total number of exercises should be {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}.</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
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

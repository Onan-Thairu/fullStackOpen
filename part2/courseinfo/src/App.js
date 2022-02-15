import React from 'react'

const Header = ({course}) => {
  return <h2>{course.name}</h2>
}


const Part = ({parts}) => parts.map((part) => {
  return <p key={part.id}> {part.name} - {part.exercises} </p>
})


const Content = ({courses}) => courses.map((course) => {
  return (
    <div>
      <Header key={course.id} course={course}  />
      <div>
        <Part key={course.id} parts={course.parts} />
      </div>
      <Total course={course} />
    </div>
    )
})

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) =>sum + part.exercises, 0)
  return (
    <div>
      <h4 key={course.id}>Total of {total} exercises.</h4>
    </div>
  )
}

const Course = ({courses}) => <Content courses={courses} />

const App = () => {
  const courses = [
    {
    name: 'Half Stack application development',
    id: 1,
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
        name: 'Redux',
        exercises: 11,
        id:4
      }
    ]  
  },  
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id:2
      }
    ]
  }
]
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App

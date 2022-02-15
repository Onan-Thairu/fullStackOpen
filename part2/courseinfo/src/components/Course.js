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

export default Course
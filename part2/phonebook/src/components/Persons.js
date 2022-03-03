import React from 'react'

const Persons = (props) => props.persons.map((person) => {
    return (
      <p key={person.name}>{person.name}  {person.number} <button onClick={() => props.erase(person.id, person.name) }>Delete</button> </p>
      )
  })


export default Persons
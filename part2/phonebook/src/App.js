import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name:'Arto Hellas',
      number:'+254759073578'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  const addNew = ((event) => {
    event.preventDefault()

    const phoneObj = {
      name:newName,
      number:newNumber
    }
    
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      const allPersons = [...persons, phoneObj]
      setPersons(allPersons)
      console.log(allPersons)
    }
    
  })

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const display = (persons) => persons.map((person) => {
    return (
      <p key={person.name}>{person.name}  {person.number}</p>
      )
  })


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>Name:   <input onChange={handleName} /></div>
        <div>Number: <input onChange={handleNumber} /> </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {display(persons)}
    </div>
  )
}

export default App
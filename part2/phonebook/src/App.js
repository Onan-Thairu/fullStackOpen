import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name:'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  
  const addNew = ((event) => {
    event.preventDefault()
    const phoneObj = {
      name:newName
    }
    const allPersons = [...persons, phoneObj]
    setPersons(allPersons)
  })

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const display = (persons) => persons.map((person) => <p key={person.name}>{person.name}</p>)


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          Name: <input onChange={handleInput} />
        </div>
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
import { useState } from 'react'
const App = () => {
  const [persons, setPersons] = useState([
    { name:'Arto Hellas', number:'+254759073578', id:1 },
    { name:'Nick Kimani', number:'+254749302890', id:2 },
    { name:'Mike Sothi', number:'+2547053490240', id:3 },
    { name:'Mark Funyi', number:'+254734957208', id:4 },
    { name:'Mark Kigwa', number:'+254729513014', id:5 },
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
    }
    
  })

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const display = (persons) => persons.map((person) => {
    return (
      <p key={person.name}>{person.name}  {person.number}</p>
      )
  })

  const search = (event) => {
    let userData = event.target.value
    let searchResultsArray = []
    if (userData){
      // Convert names to lower case and match those that start with what user types.
      searchResultsArray = persons.filter(person => person.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()))
      
      document.getElementById('searchResults').innerHTML = (
        searchResultsArray.map(person => `<li>${person.name} ${person.number}</li>`)
      )
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label htmlFor="nameSearch" >
          Filter shown with name <input type="search" name="q" id="nameSearch" onChange={search} />
          <p id='searchResults'></p>
        </label>
      </div>
      <form onSubmit={addNew}>
        <h3>Add a new</h3>
        <div>Name:   <input onChange={handleName} /></div>
        <div>Number: <input type="tel" onChange={handleNumber} /> </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {display(persons)}
    </div>
  )
}

export default App
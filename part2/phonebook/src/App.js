import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import { useState, useEffect } from 'react'
import axios from 'axios'

import phoneService from './services/phoneNumbers'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  

  useEffect(() => {
    phoneService
      .getAll()
      .then(allData => {
        setPersons(allData)
      })
  }, [])


  const addNew = ((event) => {
    event.preventDefault()

    const phoneObj = {
      name:newName,
      number:newNumber
    }
  
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      //const allPersons = [...persons, phoneObj]
      phoneService
        .create(phoneObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          //console.log(persons)
        })
    }
    
  })

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  

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
      
      <Filter onchange={search} />
      
      <h3>Add a new</h3>
      
      <PersonForm onsubmit={addNew} handlename={handleName} handlenumber={handleNumber} />

      <h3>Numbers</h3>
      
      <Persons persons={persons} />
    </div>
  )
}

export default App
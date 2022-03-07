import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import { useState, useEffect } from 'react'


import phoneService from './services/phoneNumbers'
import axios from 'axios'

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
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        axios
        .get(`http://localhost:3001/persons?name=${newName}`)
        .then(response => {
          const updateId = response.data[0].id
          const oldObj = response.data[0]
          const newObj = {...oldObj, number:newNumber}

          phoneService
            .update(updateId, newObj)
        })
      }
        
    } else {
      phoneService
        .create(phoneObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
        })
    }
    
  })

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const erase = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .delNum(id)
    }
  }

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
      
      <Persons persons={persons} erase={erase} />
    </div>
  )
}

export default App
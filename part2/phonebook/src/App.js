import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import { useState, useEffect } from 'react'


import phoneService from './services/phoneNumbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

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
  
    if(persons.some(person => person.name === phoneObj.name)) {
      if (window.confirm(`${phoneObj.name} is already added to phonebook. Replace the old number with a new one?`)) {
        axios
        .get(`http://localhost:3001/persons?name=${phoneObj.name}`)
        .then(response => {
          const updateId = response.data[0].id
          const oldObj = response.data[0]
          const newObj = {...oldObj, number:newNumber}

          phoneService
            .update(updateId, newObj)
            .then(
              notify(`${phoneObj.name}'s info has been updated.`)
            )
        })
        .catch(error => {
          notify(`${phoneObj.name} has already been removed from server`,'alert')
        })
      }
        
    } else {
      phoneService
        .create(phoneObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
        })
        .then(() => {
          notify(`${phoneObj.name} has been created`)
        })
    }
    
  })

  const handleName = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const erase = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .delNum(id)
        .then(() => {
          notify(`You have deleted ${name}`)
          setPersons(persons.filter(person => person.id !== id))
        }
        )
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

  const notify = (message, type='info') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
      
      <Filter onchange={search} />
      
      <h3>Add a new</h3>
      
      <PersonForm onsubmit={addNew} handlename={handleName} handlenumber={handleNumber} />

      <h3>Numbers</h3>
      
      <Persons persons={persons} erase={erase} />
    </div>
  )
}

export default App
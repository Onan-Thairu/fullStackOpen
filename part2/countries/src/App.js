import {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  //const [matchingData, setMatchingData] = useState([])
  
  const resultItems = document.getElementById('matchResults')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      let data = response.data
      let searchResultsArray = []
      if(search){
        // Convert both country name and search field letters to lowercase and try to match.
        searchResultsArray = data.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        
        if(searchResultsArray.length === 1) {
          let matchCountry = searchResultsArray[0]
          let langObj = matchCountry.languages
          let languagesArray = Object.values(langObj)
          
          resultItems.innerHTML = `
          <h1> ${matchCountry.name.common}</h1>
          <p>Capital:  ${matchCountry.capital}</p>
          <p>Area:     ${matchCountry.area}</p>
          <h3>Languages:</h3>
          <p>${languagesArray.map(lang => `<li>${lang}</li>`)}</p>
          <img src=${matchCountry.flags.svg} width=100 height=100 ></img>
          `
        } else if (searchResultsArray.length > 10) {
          resultItems.textContent = "Too many matches, specify another filter"
        } else if (searchResultsArray.length < 10) {
          resultItems.textContent = ""
          searchResultsArray.map(item => resultItems.innerHTML += `<li> ${item.name.common} </li>`)
        }
      }
    })
  })

  

  const handleSearch = (event => {
    setSearch(event.target.value)
  })

  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()}>
        Find countries: <input type="search" onChange={handleSearch}  />
      </form>
      <p id="matchResults"></p>
    </div>
  )
}


export default App;

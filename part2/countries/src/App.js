import {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      let data = response.data
      let searchResultsArray = []
      const resultItems = document.getElementById('matchResults')
      
      const weatherData = document.getElementById('weatherData')

      if(search){
        // Convert both country name and search field letters to lowercase and try to match.
        searchResultsArray = data.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

        
        if(searchResultsArray.length === 1) {
          const matchCountry = searchResultsArray[0]
          const langObj = matchCountry.languages
          const languagesArray = Object.values(langObj)
          
          resultItems.innerHTML = `
          <h1> ${matchCountry.name.common}</h1>
          <p>Capital:  ${matchCountry.capital}</p>
          <p>Area:     ${matchCountry.area}</p>
          <h3>Languages:</h3>
          <p>${languagesArray.map(lang => `<li>${lang}</li>`)}</p>
          <img src=${matchCountry.flags.svg} width=100 height=100 ></img>
          `

          axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${matchCountry.capitalInfo.latlng[0]}&lon=${matchCountry.capitalInfo.latlng[0]}&exclude={minutely,hourly,daily,alerts}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
            .then(response => {
              //console.log(response)
              const temperature = response.data.current.temp
              const windSpeed = response.data.current.wind_speed
              const countryCapital = matchCountry.capital[0]

              weatherData.innerHTML = `
              <h2>Weather in ${countryCapital}</h2>
              <p>Temperature: ${temperature}</p>
              <img src='http://openweathermap.org/img/wn/02n@2x.png' >
              <p>Wind: ${windSpeed} m/s</p>
              `
              
            })

        } else if (searchResultsArray.length > 10) {
          resultItems.textContent = "Too many matches, specify another filter"
          weatherData.textContent = ""
        } else if (searchResultsArray.length < 10) {
          resultItems.textContent = ""
          weatherData.textContent = ""

          //function display() {
          //  alert("Button clicked.")
          //}
          searchResultsArray.map(item => resultItems.innerHTML += `<p> ${item.name.common} <input type="button" value="Show" />`)
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
      <p id="weatherData"></p>
    </div>
  )
}


export default App;

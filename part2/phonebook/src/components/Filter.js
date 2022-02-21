import React from 'react'

const Filter = ({onchange}) => {
    return (
        <label htmlFor="nameSearch" >
          Filter shown with name <input type="search" name="q" id="nameSearch" onChange={onchange} />
          <p id='searchResults'></p>
        </label>
    )
}

export default Filter
import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onsubmit}>
            <div>Name:   <input onChange={props.handlename} /></div>
            <div>Number: <input type="tel" onChange={props.handlenumber} /> </div>
            <div>
              <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default PersonForm
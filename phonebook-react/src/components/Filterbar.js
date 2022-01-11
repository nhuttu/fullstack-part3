import React from 'react'
const Filterbar = ({ handleTextChange }) => {
    return (
        <div>
            filter shown with <input onChange={handleTextChange} />
        </div>
    )
}
export default Filterbar
import React from 'react'

const PersonForm = ({ addName, handleNumberChange, handleNoteChange, newName, newNumber }) => {
    return (
        <div>

            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNoteChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
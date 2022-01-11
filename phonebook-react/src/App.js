import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filterbar from './components/Filterbar'
import PersonForm from './components/PersonForm'
import backend from './services/backend'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setsuccessMessage] = useState('')
  const [latestDelete, setlatestDelete] = useState('')

  const Success = ({ person }) => {
    if (person === '') {
      return null
    }

    return (
      <div className='success'>
        Added {person}
      </div>
    )
  }
  const Failure = ({ person }) => {
    if (person === '') {
      return null
    }
    if (!persons.includes(person)) {
      return (
        <div className='failure'>
          {person}
        </div>
      )
    }
    return (
      <div className='failure'>
        Information of {person} has already been removed from the server
      </div>
    )
  }
  useEffect(() => {
    backend
      .getAll()
      .then(info => {
        setPersons(info)
      })
      .catch(error => {
        console.log(latestDelete + 'poistettu jo')
      })
  }, [])

  const handleTextChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deletion = id => {
    const who = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${who.name} ?`)) {
      console.log(`${id} deleted`)
      backend.
        deletion(id)
        .then(r => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log(error)
        }
        )
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const who = persons.find(p => p.name === newName).id
        console.log(who)
        backend.
          replace(who, newPerson)
          .then(r => {
            console.log(r)
            setPersons(persons.map(p => p.name === r.name ? r : p))
          })
          .catch(error => {
            console.log(error)
            setlatestDelete(newPerson.name)
            setTimeout(() => {
              setlatestDelete('')
            }, 10000)
          })
      }
    }
    else {

      backend.
        create(newPerson)
        .then(r => {
          console.log(r.data)
          setPersons(persons.concat(r.data))
          setNewName('')
          setNewNumber('')
          setsuccessMessage(r.data.name)
          setTimeout(() => {
            setsuccessMessage('')
          }, 10000)


        }
        )
        .catch(error => {
          console.log(error.response.data)
          setlatestDelete(error.response.data)
          setTimeout(() => {
            setlatestDelete('')
          }, 15000);
        })


    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Success person={successMessage} />
      <Failure person={latestDelete} />
      <Filterbar handleTextChange={handleTextChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} handleNumberChange={handleNumberChange} handleNoteChange={handleNoteChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} keyword={newSearch} deletion={deletion} />
    </div>
  )
}


export default App
import { useState, useEffect } from 'react'
import personService from './services/person'
import './index.css'

const Filter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={onFilterChange} />
  </div>
)

const Persons = ({ persons, filter }) => {
  const deletePerson = (event) => {
    if (window.confirm(`Delete ${event.target.name} ?`)) {
      personService.delete(event.target.id)
    }
  }

  return persons
    .filter((p) => p.name.toUpperCase().match(filter.toUpperCase()))
    .map((person) => (
      <div key={person.id}>
        <div>
          {person.name} {person.number}
          <button id={person.id} name={person.name} onClick={deletePerson}>
            delete
          </button>
        </div>
      </div>
    ))
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <h1>{message}</h1>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setSearch] = useState('')
  const [addedMessage, setAddedMessage] = useState('some error happened...')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const PersonForm = () => {
    const addPerson = (event) => {
      event.preventDefault()
      const matchedPersonsArray = persons.filter((p) => p.name === newName)
      if (matchedPersonsArray.length > 0) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const id = matchedPersonsArray[0].id
          const personObject = {
            id: id,
            name: newName,
            number: newNumber,
          }
          personService.update(id, personObject, setAddedMessage)
        }
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService.create(personObject)
        setPersons(persons.concat(personObject))
        setAddedMessage(`Added '${newName}'`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      }

      setNewName('')
      setNewNumber('')
    }
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    event.target.e
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App

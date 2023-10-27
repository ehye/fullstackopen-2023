import { useState, useEffect } from 'react'
import personService from './services/person'

const Filter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={onFilterChange} />
  </div>
)

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
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
const addPerson = (event) => {
  event.preventDefault()
  console.log('button clicked', newName)

  if (persons.filter((p) => p.name === newName).length > 0) {
    alert(`${newName} is already added to phonebook`)
  } else {
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject)
    setPersons(persons.concat(personObject))
  }

  setNewName('')
  setNewNumber('')
}

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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setSearch] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

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
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App

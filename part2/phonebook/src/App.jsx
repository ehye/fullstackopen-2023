import { useState, useEffect } from 'react'
import personService from './services/person'
import person from './services/person'

const Filter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={onFilterChange} />
  </div>
)

const PersonForm = ({
  persons,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  setPersons,
  setNewName,
  setNewNumber,
}) => {
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
        personService.update(id, personObject)
      }
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
        persons={persons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import personService from './services/person'

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
  console.log('render', persons.length, 'persons', persons)

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

  const Filter = () => (
    <div>
      filter shown with
      <input autoFocus value={filter} onChange={handleFilterChange} />
    </div>
  )

  const PersonForm = () => (
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

  const Persons = () =>
    persons
      .filter((p) => p.name.toUpperCase().match(filter.toUpperCase()))
      .map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>add a new</h3>
      <PersonForm />
      <h3>Numbers</h3>
      <Persons />
    </div>
  )
}

export default App

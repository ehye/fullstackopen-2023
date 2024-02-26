import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`

  useEffect(() => {
    function fetchData() {
      if (name !== '' && name != country) {
        axios
          .get(url)
          .then((response) => {
            setCountry(response)
          })
          .catch((error) => {
            setCountry(error.response)
          })
      }
    }
    fetchData()
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (country === null) {
    return null
  } else if (country.data !== null && country.data.error != null) {
    return <div>{country.data.error}</div>
  } else
    return (
      <div>
        <h3>{country.data.name.common} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div>
        <img src={country.data.flags.svg} height="100" alt={`flag of ${country.data.name.common}`} />
      </div>
    )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

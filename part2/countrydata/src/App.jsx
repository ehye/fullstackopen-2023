import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
// baseUrl = 'http://localhost:3001/data'

const Output = ({ countries }) => {
  if (countries === null || countries.length == 0) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (1 < countries.length && countries.length <= 10) {
    return countries.map((data) => (
      <div key={data.name.common}>
        <div>{data.name.common}</div>
      </div>
    ))
  }
  if (countries.length == 1) {
    const valuesArray = Object.values(countries[0].languages)
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>capital {countries[0].capital[0]}</div>
        <div>area {countries[0].area}</div>
        <h2>languages</h2>
        <ul>
          {valuesArray.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <img src={countries[0].flags.svg} alt={countries[0].flags.alt} />
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setfilterCountries] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleQueryChange = (event) => {
    var matchedDataArray = countries.filter((p) =>
      p.name.common.toUpperCase().match(event.target.value.toUpperCase())
    )
    setfilterCountries(matchedDataArray)
  }

  return (
    <div>
      <div>
        find countries <input onChange={handleQueryChange} />
      </div>
      <Output countries={filterCountries} />
    </div>
  )
}

export default App

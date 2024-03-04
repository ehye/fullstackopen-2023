import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = props => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = [...result.data.allAuthors]

  const updateAge = async () => {
    await updateAuthor({ variables: { name, setBornTo: Number(age) } })
    setName('')
    setAge('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set year of birth</h3>
      name
      <select onChange={({ target }) => setName(target.value)}>
        {authors.map(a => (
          <option key={a.id} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
      age
      <input value={age} onChange={({ target }) => setAge(target.value)} />
      <button onClick={updateAge}>update author</button>
    </div>
  )
}

export default Authors

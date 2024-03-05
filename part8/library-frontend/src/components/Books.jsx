import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = [...result.data.allBooks]

  const filterButtons = () => {
    const arr = [...new Set(books.map(book => book.genres.map(genre => genre)).flat(1))]
    let result = arr.map(b => (
      <button key={b} value={b} onClick={({ target }) => setFilter(target.value)}>
        {b}
      </button>
    ))
    result.push(
      <button key="all" onClick={() => setFilter('')}>
        All
      </button>,
    )
    return result
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(book => (filter === '' ? book : book.genres.find(g => g === filter)))
            .map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {filterButtons()}
    </div>
  )
}

export default Books

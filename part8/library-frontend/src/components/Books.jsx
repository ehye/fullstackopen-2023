import { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { updateCache } from '../App'
import Notify from './Notify'

const Books = props => {
  const [filter, setFilter] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [allBooks, setAllBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: { genres: filter },
  })

  useEffect(() => {
    if (!result.loading) {
      setAllBooks(result.data.allBooks)
    }
  }, [result.loading, result.data?.allBooks])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      notify(`${addedBook.title} by ${addedBook.author.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      setAllBooks(allBooks.concat(addedBook))
    },
    onError: error => {
      console.log(error)
    },
  })

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const filterButtons = () => {
    const arr = [...new Set(allBooks.map(book => book.genres.map(genre => genre)).flat(1))]
    let result = arr.map(b => (
      <button key={b} value={b} onClick={({ target }) => setFilter([target.value])}>
        {b}
      </button>
    ))
    result.push(
      <button key="all" onClick={() => setFilter([])}>
        All
      </button>,
    )
    return result
  }

  return (
    <div>
      <h2>books</h2>
      <Notify errorMessage={errorMessage} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map(book => (
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

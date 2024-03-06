import { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK, BOOK_ADDED } from '../queries'
import Notify from './Notify'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = a => {
    let seen = new Set()
    return a.filter(item => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => ({
    allBooks: uniqByName(allBooks.concat(addedBook)),
  }))
}

const NewBook = props => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
      notify(messages)
    },
  })
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} by ${addedBook.author.name} added`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
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

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()
    if (title && published && author && genres) {
      createBook({ variables: { title, published, author, genres } })
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(Number(target.value))} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'
import { updateCache } from '../App'
import { ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = props => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
    onError: error => {
      console.log(error)
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      notify(messages)
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
    if (title && published && author) {
      createBook({ variables: { title, published, author, genres } })
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenres([])
      setGenre('')
      window.alert(`${title} by ${author.name} added`)
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

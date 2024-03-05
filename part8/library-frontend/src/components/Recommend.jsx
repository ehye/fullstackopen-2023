import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = props => {
  const favorites = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (favorites.loading || books.loading) {
    return <div>loading...</div>
  }

  const myFavorites = () => [...favorites.data.me.favorite]

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre patterns
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {[...books.data.allBooks]
            .filter(book => [...book.genres].filter(genre => myFavorites().includes(genre)))
            .map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String, $genres: [String]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      genres
      published
      title
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation AddBook($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
    }
  }
`

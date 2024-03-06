import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const AUTHOR_DETAIL = gql`
  fragment AuthorDetail on Author {
    id
    name
    born
    bookCount
  }
`

const BOOK_DETAIL = gql`
  fragment BookDetail on Book {
    id
    title
    published
    genres
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      genres
      published
      title
      author {
        id
        name
        born
        bookCount
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      ...BookDetail
      author {
        ...AuthorDetail
      }
    }
  }
  ${AUTHOR_DETAIL}
  ${BOOK_DETAIL}
`

export const ALL_BOOKS = gql`
  query ($genres: [String], $author: String) {
    allBooks(genres: $genres, author: $author) {
      ...BookDetail
      author {
        id
        name
      }
    }
  }
  ${BOOK_DETAIL}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetail
    }
  }
  ${AUTHOR_DETAIL}
`
export const UPDATE_AUTHOR = gql`
  mutation AddBook($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
    }
  }
`
export const ME = gql`
  query Me {
    me {
      username
      favorite
      id
    }
  }
`

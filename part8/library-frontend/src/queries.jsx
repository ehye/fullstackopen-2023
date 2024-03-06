import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
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

export const ALL_BOOKS = gql`
  query AllBooks($genres: [String], $author: String) {
    allBooks(genres: $genres, author: $author) {
      id
      title
      published
      genres
      author {
        name
      }
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
export const ME = gql`
  query Me {
    me {
      username
      favorite
      id
    }
  }
`

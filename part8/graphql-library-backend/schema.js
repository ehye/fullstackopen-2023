const typeDefs = `
  type Book {
    title: String
    published: Int
    author: Author!
    id: String!
    genres: [String]
  }

  type Author {
    id: String!
    name: String
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favorite: [String]
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genres: [String]): [Book],
    allAuthors: [Author!]!,
    me: User,
    favorite: [String]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book,
    addAuthor(
      name: String!,
    ): Author,
    editAuthor(
      name: String!,
      setBornTo: Int!,
    ): Author,
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token,
    addAsFavorite(
      genre: String!
    ): User
  }
`

module.exports = typeDefs

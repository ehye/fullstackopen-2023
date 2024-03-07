const { GraphQLError } = require('graphql')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (Array.isArray(args.genres) && args.genres.length > 0) {
        return await Book.find({ genres: { $in: [...args.genres] } }).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async root => {
      try {
        const authors = await Author.find({})
        const authorIds = authors.map(author => author._id)
        const bookCounts = await Book.aggregate([
          {
            $match: { author: { $in: authorIds } },
          },
          {
            $group: {
              _id: '$author',
              bookCount: { $sum: 1 },
            },
          },
        ])

        return authors.map(author => ({
          id: author.id.toString(),
          name: author.name,
          born: author.born,
          bookCount: bookCounts.find(b => b._id.toString() == author.id)?.bookCount ?? 0,
        }))
      } catch (err) {
        console.error(err)
        throw new Error('Failed to fetch authors')
      }
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        throw new GraphQLError('author not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        })
      }

      const book = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error: error.message,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError('not such user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addAsFavorite: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      if (!currentUser.favorite.includes(args.genre)) {
        currentUser.favorite.push(args.genre)
        await currentUser.save()
      }

      return currentUser
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Book: {
    title: root => root.title,
    published: root => root.published,
    author: root => root.author,
    id: root => root.id,
    genres: root => root.genres,
  },
  Author: {
    id: root => root.id,
    name: root => root.name,
    born: root => root.born,
    bookCount: root => root.bookCount,
  },
}

module.exports = resolvers

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
}, 10000)

describe('viewing blogs', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toEqual(2)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const result = response.body
    result.forEach((element) => {
      expect(element.id).toBeDefined()
    })
  })
})

describe('addition of a new note', () => {
  test('post is saved correctly to the database', async () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    var res = await api.post('/api/blogs').send(blog)
    const response = await api.get('/api/blogs/' + res.body.id)

    const jObj = response.body
    expect(jObj.title).toEqual(blog.title)
    expect(jObj.author).toEqual(blog.author)
    expect(jObj.url).toEqual(blog.url)
    expect(jObj.likes).toEqual(blog.likes)
  })

  test('if the likes property is missing, it will default to the value 0', async () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    }
    var res = await api.post('/api/blogs').send(blog)
    const response = await api.get('/api/blogs/' + res.body.id)

    const jObj = response.body
    expect(jObj.likes).toEqual(0)
  })

  test('if the title or url properties are missing, responds the status code 400', async () => {
    const blog = { author: 'Michael Chan' }
    var response = await api.post('/api/blogs').send(blog).expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogToDelete = initialBlogs[0]

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(1)

    const ids = blogsAtEnd.body.map((r) => r.id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

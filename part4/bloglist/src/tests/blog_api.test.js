const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../models/blog')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

let token

beforeEach(async () => {
  await User.deleteMany({})
  const user = helper.initialUsers[0]
  await api.post('/api/users').send(user)
  const response = await api.post('/api/login').send(user)
  token = `Bearer ${response.body.token}`

  // await Blog.deleteMany({})
  // await Blog.insertMany(helper.initialBlogs)
})

describe('viewing blogs', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toEqual(helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const result = response.body
    result.forEach((element) => {
      expect(element.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('post is saved correctly to the database', async () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    var res = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

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
    var res = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/' + res.body.id)
    const jObj = response.body
    expect(jObj.likes).toEqual(0)
  })

  test('if the title or url properties are missing, responds the status code 400', async () => {
    const blog = { author: 'Michael Chan' }
    var response = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
      .expect(400)
  })

  test('fails with 401 Unauthorized if a token is not provided', async () => {
    const blog = { author: 'Michael Chan' }
    var response = await api.post('/api/blogs').send(blog).expect(401)
  })
})

describe('deletion of a blog', () => {
  let id
  beforeEach(async () => {
    await Blog.deleteMany({})

    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.initialBlogs[0])

    id = response.body.id
  })

  test.only('succeeds with status code 204 if id is valid', async () => {
    await api.delete(`/api/blogs/${id}`).set('Authorization', token).expect(204)
    const ids = helper.blogsInDb.map((r) => r.id)
    expect(ids).not.toContain(id)
  })
})

describe('update of a blog', () => {
  test('return updated object as json', async () => {
    // const blogToUpdate = helper.initialBlogs[0]
    const blogToUpdate = helper.blogsInDb[0]
    blogToUpdate.likes = 2077

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .set('Authorization', token)
      .send(blogToUpdate)

    const blogAfterUpdate = await api
      .get('/api/blogs/' + response.body.id)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogAfterUpdate.body.likes).toBe(2077)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

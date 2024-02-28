import { createSlice } from '@reduxjs/toolkit'
import { showNotificationOf } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlogOf(state, action) {
      const id = action.payload.id
      const blogs = JSON.parse(JSON.stringify(state))
      const blogToLike = blogs.find(n => n.id === id)
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      }
      return blogs.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    removeBlog(state, action) {},
  },
})

export const { setBlogs, appendBlog, likeBlogOf, removeBlog } = blogSlice.actions

export const onInitializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const onCreateBlog = blogObject => {
  return async dispatch => {
    try {
      const createdBlog = await blogsService.create(blogObject)
      dispatch(appendBlog(createdBlog))
      dispatch(showNotificationOf('a new blog ' + createdBlog.title + ' by ' + createdBlog.author + ' added'))
    } catch (exception) {
      dispatch(showNotificationOf(exception.response.data.error))
    }
  }
}

export const onLikeBlog = blog => {
  return async dispatch => {
    const likeBlog = await blogsService.update(blog)
    dispatch(likeBlogOf(likeBlog))
  }
}

export default blogSlice.reducer

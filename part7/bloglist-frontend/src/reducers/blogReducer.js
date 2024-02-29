import { createSlice } from '@reduxjs/toolkit'
import { showNotificationOf } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    onLikeBlog(state, action) {
      const id = action.payload.id
      const blogs = JSON.parse(JSON.stringify(state))
      const blogToLike = blogs.find(n => n.id === id)
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      }
      return blogs.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    onRemoveBlog(state, action) {
      const id = action.payload.id
      const blogs = JSON.parse(JSON.stringify(state))
      return blogs.filter(blog => blog.id !== id)
    },
    onMakeComment(state, action) {
      const blogs = JSON.parse(JSON.stringify(state))
      const changedBlog = blogs.find(n => n.id === action.payload.id)
      changedBlog.comments.push(action.payload.comment)
      return blogs.map(blog => (blog.id === action.payload.id ? changedBlog : blog))
    },
  },
})

export const { setBlogs, appendBlog, onLikeBlog, onRemoveBlog, onMakeComment } = blogSlice.actions

export const onInitializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogOf = blog => {
  return async dispatch => {
    try {
      const createdBlog = await blogsService.create(blog)
      dispatch(appendBlog(createdBlog))
      dispatch(showNotificationOf('a new blog ' + createdBlog.title + ' by ' + createdBlog.author + ' added'))
    } catch (exception) {
      dispatch(showNotificationOf(exception.response.data.error))
    }
  }
}

export const likeBlogOf = blog => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const likeBlog = await blogsService.update(likedBlog.id, likedBlog)
    dispatch(onLikeBlog(likeBlog))
  }
}

export const removeBlogOf = blog => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogsService.remove(blog.id)
      dispatch(onRemoveBlog(blog))
    }
  }
}

export const makeCommentOf = ({ id, comment }) => {
  return async dispatch => {
    await blogsService.comment(id, { comment: comment })
    dispatch(onMakeComment({ id, comment }))
  }
}

export default blogSlice.reducer

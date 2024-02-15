import { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const updateLikes = async (blogObject, token) => {
  const updatedBlog = {
    user: blogObject.user.id,
    author: blogObject.author,
    title: blogObject.title,
    url: blogObject.url,
    likes: blogObject.likes + 1,
  }
  blogService.setToken(token)
  const response = await blogService.update(blogObject.id, updatedBlog)
  return response
}

const Blog = ({ blog, token }) => {
  const viewFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view" toggleButtonLabel="hide" ref={viewFormRef}>
        <ul>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button
              onClick={async () => {
                updateLikes(blog, token)
              }}
            >
              like
            </button>{' '}
          </div>
          <div>{blog.author}</div>
        </ul>
      </Togglable>
    </div>
  )
}

export default Blog

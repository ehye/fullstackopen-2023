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
  await blogService.update(blogObject.id, updatedBlog)
}

const removeBlog = async (blogObject, token) => {
  if (
    window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
  ) {
    blogService.setToken(token)
    await blogService.remove(blogObject.id)
  }
}

const removeButton = (blog, token) => {
  return (
    <button
      onClick={() => {
        removeBlog(blog, token)
      }}
    >
      remove
    </button>
  )
}

const Blog = ({ blog, user }) => {
  const viewFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view" toggleButtonLabel="hide" ref={viewFormRef}>
        <ul>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button
              onClick={async () => {
                updateLikes(blog, user.token)
              }}
            >
              like
            </button>{' '}
          </div>
          <div>{blog.author}</div>
        </ul>
        {user && user.id === blog.user.id && removeButton(blog, user.token)}
      </Togglable>
    </div>
  )
}

export default Blog

import { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
            likes {blog.likes} <button>like</button>{' '}
          </div>
          <div>{blog.author}</div>
        </ul>
      </Togglable>
    </div>
  )
}

export default Blog

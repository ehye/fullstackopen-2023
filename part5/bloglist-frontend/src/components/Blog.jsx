import { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const removeButton = (removeBlog) => <button onClick={removeBlog}>remove</button>

const Blog = ({ blog, updateLikes, removeBlog, isRemovable }) => {
  const viewFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view" toggleButtonLabel="hide" ref={viewFormRef}>
        <ul>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button id="btn-likes" onClick={updateLikes}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
        </ul>
        {isRemovable && removeButton(removeBlog)}
      </Togglable>
    </div>
  )
}

export default Blog

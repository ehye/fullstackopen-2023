import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlogOf, removeBlogOf } from '../reducers/blogReducer'
import Togglable from './Togglable'

const Blog = ({ blog, isRemovable }) => {
  const dispatch = useDispatch()
  const viewFormRef = useRef()

  const handleLikes = async () => {
    dispatch(likeBlogOf(blog))
  }

  const removeButton = blog => (
    <button
      id="button-remove"
      onClick={() => {
        dispatch(removeBlogOf(blog))
      }}
    >
      remove
    </button>
  )

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
            likes {blog.likes}
            <button id="btn-likes" onClick={handleLikes}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
        </ul>
        {isRemovable && removeButton(blog)}
      </Togglable>
    </div>
  )
}

export default Blog

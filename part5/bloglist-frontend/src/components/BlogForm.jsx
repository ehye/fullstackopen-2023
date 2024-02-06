const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title:{' '}
        <input value={props.newTitle} onChange={props.handleTitleChange} />
      </div>
      <div>
        author:{' '}
        <input value={props.newAuthor} onChange={props.handleAuthorChange} />
      </div>
      <div>
        url: <input value={props.newUrl} onChange={props.handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

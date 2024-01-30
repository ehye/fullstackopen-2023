const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  let max = 0
  let favoriteBlog
  for (const blog of blogs) {
    if (max < blog.likes) {
      max = blog.likes
      favoriteBlog = blog
    }
  }
  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

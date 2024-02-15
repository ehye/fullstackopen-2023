import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test("renders the blog's title and author", () => {
  const blog = {
    title: 'TITLE',
    author: 'AUTHOR',
  }
  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('TITLE')
  expect(div).toHaveTextContent('AUTHOR')
})

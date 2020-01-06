import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
  let component

  const blog = {
    title: 'Blog title',
    author: 'Mark Test',
    likes: 3
  }

  const mockHandler = jest.fn()

  afterEach(cleanup)

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('renders blog content', () => {

    expect(screen.getByText(blog.title + ' ' + blog.author)).toBeInTheDocument()
    expect(screen.getByText('blog has ' + blog.likes + ' likes')).toBeInTheDocument()
  })


  test('like button fires call', () => {

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)

  })

})
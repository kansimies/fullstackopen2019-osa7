import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  }

  const mockUpdate = jest.fn()

  const mockRemove = jest.fn()

  afterEach(cleanup)

  beforeEach(() => {
    component = render(
      <Blog blog={blog} isRemovable={false} onUpdatedPost={mockUpdate} onRemovePost={mockRemove} />
    )
  })

  test('by default blog is not visible as expanded', () => {

    expect(component.container.querySelector('ul')).toBeNull()

  })

  test('after div click the whole blog is shown', () => {

    let content = component.container.querySelectorAll('li')
    expect(content.length).toBe(0)
    const button = component.container.querySelector('.blog')
    fireEvent.click(button)
    content = component.container.querySelectorAll('li')
    expect(content.length).toBe(Object.keys(blog).length)

  })

})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Notification from '../components/Notification'

afterEach(cleanup)

test('renders content', () => {
  const notification = {
    message: 'Component testing is done with react-testing-library',
    type: 'success'
  }

  const component = render(
    <Notification {...notification} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
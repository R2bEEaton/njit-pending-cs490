import {render, screen} from '@redwoodjs/testing/web'

import HomePage from './HomePage'

// Mock the TaskBox component
jest.mock('../../components/TaskBox/TaskBox', () => {
  return () => <div/>;
});

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('renders the message if user is authenticated', () => {
    mockCurrentUser({ email: 'email@domain.com' })

    render(<HomePage />)

    expect(
      screen.getByText('email@domain.com')
    ).toBeInTheDocument()
  })
})

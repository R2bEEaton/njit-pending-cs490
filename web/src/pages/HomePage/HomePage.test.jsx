import { render, waitFor } from '@redwoodjs/testing/web'

import HomePage from './HomePage'
import LoginPage from "src/pages/LoginPage/LoginPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('renders the message if user is authenticated', () => {
    mockCurrentUser({ email: 'email@domain.com' })

    render(<HomePage />)

    waitFor(() => {
      expect(
        screen.findByText('email@domain.com')
      ).toBeInTheDocument()
    })
  })
})

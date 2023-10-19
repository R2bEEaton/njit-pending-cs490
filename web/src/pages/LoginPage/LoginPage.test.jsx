import { render, screen, waitFor } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPage />)
    }).not.toThrow()

    waitFor(() => expect(
        screen.findByText('Login with Google')
      ).toBeInTheDocument()
    )
  })

  it('renders the message if user is authenticated', () => {
    mockCurrentUser({ email: 'email@domain.com' })

    render(<LoginPage />)

    waitFor(() => {
      expect(
        screen.findByText('You are authenticated as email@domain.com')
      ).toBeInTheDocument()
    })
  })
})

import { domAnimation } from 'framer-motion'

import { render, waitFor } from '@redwoodjs/testing/web'

import LoginPage from 'src/pages/LoginPage/LoginPage'

import HomePage from './HomePage'

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
      expect(screen.findByText('email@domain.com')).toBeInTheDocument()
    })
  })

  it('renders the notification if user is authenticated', () => {
    mockCurrentUser({ email: 'email@domain.com' })

    render(<HomePage />)

    waitFor(() => {
      expect(screen.findByText('Login successful').toBeInTheDocument())
    })
  })

  it('doesnt render the message if user is authenticated', () => {
    render(<HomePage />)

    waitFor(() => {
      expect(screen.findByText('nothing to see here')).toBeInTheDocument()
    })
  })
})

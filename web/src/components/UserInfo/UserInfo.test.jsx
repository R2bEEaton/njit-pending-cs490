import { render, waitFor } from '@redwoodjs/testing/web'

import UserInfo from './UserInfo'
import HomePage from "src/pages/HomePage/HomePage";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserInfo />)
    }).not.toThrow()
  })

  it('renders user name', () => {
    mockCurrentUser({ firstName: 'Brendan', lastName: 'Clayton' })

    render(<UserInfo />)

    waitFor(() => {
      expect(
        screen.findByText('Brendan Clayton')
      ).toBeInTheDocument()
    })
  })
})

import { render } from '@redwoodjs/testing/web'

import UserInfo from './UserInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserInfo />)
    }).not.toThrow()
  })
})

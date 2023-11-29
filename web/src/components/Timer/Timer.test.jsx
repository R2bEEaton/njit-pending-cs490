import { render } from '@redwoodjs/testing/web'

import Timer from './Timer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Timer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Timer />)
    }).not.toThrow()
  })
})

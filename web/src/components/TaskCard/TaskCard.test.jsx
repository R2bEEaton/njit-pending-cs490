import { render } from '@redwoodjs/testing/web'

import TaskCard from './TaskCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskCard />)
    }).not.toThrow()
  })
})

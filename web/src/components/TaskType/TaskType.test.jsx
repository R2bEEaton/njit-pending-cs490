import { render } from '@redwoodjs/testing/web'

import TaskType from './TaskType'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskType', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskType />)
    }).not.toThrow()
  })
})

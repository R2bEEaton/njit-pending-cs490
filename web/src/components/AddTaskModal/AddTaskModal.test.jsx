import { render } from '@redwoodjs/testing/web'

import AddTaskModal from './AddTaskModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddTaskModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTaskModal />)
    }).not.toThrow()
  })
})

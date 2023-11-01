import { render } from '@redwoodjs/testing/web'

import TasksPage from './TasksPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TasksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TasksPage />)
    }).not.toThrow()
  })
})

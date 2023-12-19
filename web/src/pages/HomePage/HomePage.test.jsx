import { render } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

// Mock the TaskBox component
jest.mock('../../components/TaskBox/TaskBox', () => {
  return () => <div />
})

jest.mock('../../components/AppointmentsBox/AppointmentsBox', () => {
  return () => <div />
})

jest.mock('../../components/AddTaskModal/AddTaskModal', () => {
  return () => <div />
})

mockCurrentUser({ id: 1 })
describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage setDate2={() => jest.fn()} />)
    }).not.toThrow()
  })
})

import {render} from '@redwoodjs/testing/web'

import HomePage from './HomePage'

// Mock the TaskBox component
jest.mock('../../components/TaskBox/TaskBox', () => {
  return () => <div/>;
});

mockCurrentUser({id: 1})

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})

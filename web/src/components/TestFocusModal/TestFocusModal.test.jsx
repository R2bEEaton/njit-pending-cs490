import { render } from '@redwoodjs/testing/web'

import TestFocusModal from './TestFocusModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TestFocusModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestFocusModal />)
    }).not.toThrow()
  })
})

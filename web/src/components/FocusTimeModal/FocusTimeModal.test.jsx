import { render } from '@redwoodjs/testing/web'

import FocusTimeModal from './FocusTimeModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FocusTimeModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FocusTimeModal />)
    }).not.toThrow()
  })
})

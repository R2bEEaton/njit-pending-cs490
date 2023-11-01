import { render } from '@redwoodjs/testing/web'

import DatePicker from './DatePicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DatePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatePicker />)
    }).not.toThrow()
  })
})

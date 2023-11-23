import { render } from '@redwoodjs/testing/web'

import AppointmentsBox from './AppointmentsBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppointmentsBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppointmentsBox />)
    }).not.toThrow()
  })
})

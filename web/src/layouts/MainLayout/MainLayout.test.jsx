import { render } from '@redwoodjs/testing/web'

import MainLayout from './MainLayout'

global.URL.createObjectURL = jest.fn()

jest.mock('../../pages/HomePage/HomePage', () => {
  return () => <div />
})

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout />)
    }).not.toThrow()
  })
})

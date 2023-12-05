import { render } from '@redwoodjs/testing/web'

import Timer from './Timer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Timer', () => {
  jest.useFakeTimers('legacy')
  jest.mock('worker-timers')
  global.URL.createObjectURL = jest.fn();
  global.Worker = jest.fn(function Worker() {
    this.addEventListener = jest.fn();
    this.postMessage = jest.fn();
  });

  it('renders successfully', () => {
    expect(() => {
      render(<Timer numPomosComplete={10} updateNumPomosComplete={jest.fn()} isPomo={true} numMinutes={60} numPomos={20} onTimerFinish={jest.fn()} setIsTimerRunning={jest.fn()} />)
    }).not.toThrow()
  })
})

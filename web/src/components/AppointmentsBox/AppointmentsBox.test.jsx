import { render, screen } from '@redwoodjs/testing/web'

import AppointmentsBox from './AppointmentsBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const fakeAppointments = [
  {
    "id": 1,
    "summary": "Meeting with Counselor1",
    "startTime": "12:45:00",
    "endTime": "15:45:00",
    "allDay": false
  },
  {
    "id": 2,
    "summary": "Meeting with Teammates2",
    "startTime": "13:15:00",
    "endTime": "14:00:00",
    "allDay": false
  },
  {
    "id": 3,
    "summary": "Meeting with Counselor3",
    "startTime": "13:30:00",
    "endTime": "14:30:00",
    "allDay": false
  },
  {
    "id": 4,
    "summary": "Meeting with Counselor4",
    "startTime": "14:45:00",
    "endTime": "16:00:00",
    "allDay": false
  },
  {
    "id": 5,
    "summary": "Meeting with Counselor5",
    "startTime": "19:00:00",
    "endTime": "19:30:00",
    "allDay": false
  },
  {
    "id": 6,
    "summary": "Meeting with Counselor6",
    "startTime": "19:30:00",
    "endTime": "21:30:00",
    "allDay": false
  },
  {
    "id": 7,
    "summary": "Meeting with Counselor7",
    "startTime": "18:00:00",
    "endTime": "18:30:00",
    "allDay": false
  },
  {
    "id": 8,
    "summary": "Meeting with Counselor8",
    "startTime": "12:00:00",
    "endTime": "13:30:00",
    "allDay": true
  },
  {
    "id": 9,
    "summary": "Meeting with Counselor9",
    "startTime": "12:00:00",
    "endTime": "13:30:00",
    "allDay": true
  },
]

describe('AppointmentsBox', () => {
  jest.useFakeTimers('legacy')
  jest.mock('worker-timers')
  global.URL.createObjectURL = jest.fn();
  global.Worker = jest.fn(function Worker() {
    this.addEventListener = jest.fn();
    this.postMessage = jest.fn();
  });

  it('all tasks to be rendered correctly', () =>  {
    render(<AppointmentsBox appointmentsJSON={fakeAppointments}/>)

    for (let appt of fakeAppointments) {
      expect(screen.getByText(appt.summary)).toBeVisible()
    }
  })
})

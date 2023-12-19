import {render} from '@redwoodjs/testing/web'

import HomePage from './HomePage'
import {useAuth} from "src/auth";
import {RedwoodApolloProvider} from "@redwoodjs/web/apollo";

// Mock the TaskBox component
jest.mock('../../components/TaskBox/TaskBox', () => {
  return () => <div/>;
});

jest.mock('../../components/AppointmentsBox/AppointmentsBox', () => {
  return () => <div/>;
});

jest.mock('../../components/AddTaskModal/AddTaskModal', () => {
  return () => <div/>;
});

mockCurrentUser({id: 1})
describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodApolloProvider useAuth={useAuth}>
          <HomePage setDate2={() => jest.fn()}/>
        </RedwoodApolloProvider>)
    }).not.toThrow()
  })

  it('successfully renders unsuccessfully', () => {
    expect(() => {
      render(
        <RedwoodApolloProvider useAuth={useAuth}>
          <HomePage />
        </RedwoodApolloProvider>)
    }).toThrow()
  })
})

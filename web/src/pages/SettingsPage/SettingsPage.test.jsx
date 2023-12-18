import { render, screen, waitFor } from '@redwoodjs/testing/web';
import userEvent from '@testing-library/user-event';
import SettingsPage from './SettingsPage';
import {RedwoodApolloProvider} from "@redwoodjs/web/apollo";

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    reauthenticate: jest.fn(),
  }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import { useAuth } from 'web/src/auth'


describe('SettingsPage', () => {
  it('calls onSubmit when the form is filled', async () => {
    const fname = 'Joe'
    const lname = 'Blow'
    const pomodoro = '1'
    const sbreak = '2'
    const lbreak = '3'
    const { container } =  render(
      <RedwoodApolloProvider useAuth={useAuth}>
        <SettingsPage />
      </RedwoodApolloProvider>
    );

    const firstNameInput = container.querySelector('[name="firstName"]');
    const lastNameInput = container.querySelector('[name="lastName"]');
    const pomodoroInput = container.querySelector('[name="pomodoro"]');
    const shortBreakInput = container.querySelector('[name="shortBreak"]');
    const longBreakInput = container.querySelector('[name="longBreak"]');
    const submitButton = screen.getByText('Save');

    await waitFor(() => userEvent.type(firstNameInput, fname))
    await waitFor(() => userEvent.type(lastNameInput, lname))
    await waitFor(() => userEvent.type(pomodoroInput, pomodoro))
    await waitFor(() => userEvent.type(shortBreakInput, sbreak))
    await waitFor(() => userEvent.type(longBreakInput, lbreak))
    await waitFor(() => userEvent.click(submitButton))
  });

  it('does not submit when required fields are empty', async () => {
    render(
      <RedwoodApolloProvider useAuth={useAuth}>
        <SettingsPage/>
      </RedwoodApolloProvider>
    );

    const submitButton = screen.getByText('Save');

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Error saving settings.')).toBeInTheDocument();
    });
  });
});

import { render, screen, waitFor } from '@redwoodjs/testing/web';
import userEvent from '@testing-library/user-event';
import SettingsPage from './SettingsPage';

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


describe('SettingsPage', () => {
  it('calls onSubmit when the form is filled', async () => {
    const onSubmit = jest.fn(); // Mock the onSubmit function
    const fname = 'Joe'
    const lname = 'Blow'
    const pomodoro = '1'
    const sbreak = '2'
    const lbreak = '3'
    render(<SettingsPage />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const pomodoroInput = screen.getByLabelText('Pomodoro');
    const shortBreakInput = screen.getByLabelText('Short Break');
    const longBreakInput = screen.getByLabelText('Long Break');
    const submitButton = screen.getByText('Save');

    await waitFor(() => userEvent.type(firstNameInput, fname))
    await waitFor(() => userEvent.type(lastNameInput, lname))
    await waitFor(() => userEvent.type(pomodoroInput, pomodoro))
    await waitFor(() => userEvent.type(shortBreakInput, sbreak))
    await waitFor(() => userEvent.type(longBreakInput, lbreak))
    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).toHaveBeenCalled()
  });

  it('does not submit when required fields are empty', () => {
    const onSubmit = jest.fn();

    render(<SettingsPage />);

    const submitButton = screen.getByText('Save');

    userEvent.click(submitButton);

    // Ensure that the onSubmit function is not called
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
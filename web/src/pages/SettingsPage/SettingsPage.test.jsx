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
  /* it('calls onSubmit when the form is filled', async () => {
    const onSubmit = jest.fn(); // Mock the onSubmit function
    const fname = 'Joe'
    const lname = 'Blow'
    const pomodoro = '1'
    const sbreak = '2'
    const lbreak = '3'
    const { container } =  render(<SettingsPage />);

    const firstNameInput = container.querySelector('[name="firstName"]');
    console.log(firstNameInput)
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

    expect('Saved').toBeInTheDocument();
    //expect(onSubmit).toHaveBeenCalled()
  }); */

  it('does not submit when required fields are empty', () => {
    const onSubmit = jest.fn();

    render(<SettingsPage />);

    const submitButton = screen.getByText('Save');

    userEvent.click(submitButton);

    // Ensure that the onSubmit function is not called
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

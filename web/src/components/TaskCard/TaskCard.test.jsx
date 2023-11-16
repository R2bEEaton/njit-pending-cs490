import { render, screen } from '@redwoodjs/testing/web'
import TaskCard from './TaskCard'
import {act} from "react-dom/test-utils";

const taskDatas = [
  {
    "id": 1,
    "title": "Complete Math Homework 1234",
    "notes": "Modernipsum dolor sit amet illusionism hudson river school situationist international land art, cloisonnism existentialism dada tonalism international gothic expressionism.",
    "status": "NotStarted",
    "pomodoros": 20,
    "expanded": false
  },
  {
    "id": 2,
    "title": "Complete Math Homework 1234",
    "notes": "Der blaue reiter tachism eclecticism geometric abstraction color field painting neoclassicism metaphysical art impressionism post-structuralism, post-painterly abstraction mail art multiculturalism socialist realism cubo-futurism art nouveau.",
    "status": "NotStarted",
    "pomodoros": 30,
    "expanded": true
  },
  {
    "id": 2,
    "title": "Complete Math Homework 1235",
    "notes": "Neoclassicism cubism post-impressionism systems art neue slowenische kunst illusionism superflat, intervention art sound art expressionism lyrical abstraction existentialism, impressionism caravaggisti abstract expressionism systems art synchromism.",
    "status": "NotStarted",
    "pomodoros": 0,
    "expanded": true
  }
]

const itif = (condition) => condition ? it : () => {};

const currentUser = {pomodoro: 25}
mockCurrentUser(currentUser)
const mockCallback = jest.fn()

describe.each(taskDatas)('TaskCard', (task) => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskCard task={task} callback={mockCallback} />)
    }).not.toThrow()

    // Title is visible
    expect(screen.getByText(task.title)).toBeVisible()
  })

  it('cards are rendered based on expanded', () =>  {
    render(<TaskCard task={task} callback={mockCallback} />)

    // Check if the notes and pomodoros are visible when the card is expanded
    if (task.expanded) {
      expect(screen.getAllByText(task.notes)[0]).toBeVisible()
      expect(screen.getByText(`Number of Pomodoro Timers (${currentUser.pomodoro} mins each)`)).toBeVisible()
    } else {
      expect(screen.getAllByText(task.notes)[0]).not.toBeVisible()
      expect(screen.getByText(`Number of Pomodoro Timers (${currentUser.pomodoro} mins each)`)).not.toBeVisible()
    }
  })

  itif(task.expanded)('pomodoros are edited successfully', () => {
    render(<TaskCard task={{...task}} callback={mockCallback} />)

    expect(screen.getByLabelText('pomodoros').textContent).toBe(task.pomodoros.toString())
    expect(screen.getByText(`Number of Pomodoro Timers (${currentUser.pomodoro} mins each)`)).toBeVisible()

    // Pomodoros buttons are not visible before clicking the edit button
    expect(screen.getByLabelText('increment pomodoros')).not.toBeVisible()
    expect(screen.getByLabelText('decrement pomodoros')).not.toBeVisible()

    // Click the button
    act(() => {
      screen.getByLabelText('edit pomodoros').click()
    })

    expect(screen.getByLabelText('increment pomodoros')).toBeVisible()
    expect(screen.getByLabelText('decrement pomodoros')).toBeVisible()

    // Decrement
    act(() => {
      screen.getByLabelText('decrement pomodoros').click()
    })

    // Click the button again
    act(() => {
      screen.getByLabelText('edit pomodoros').click()
    })

    expect(screen.getByLabelText('increment pomodoros')).not.toBeVisible()
    expect(screen.getByLabelText('decrement pomodoros')).not.toBeVisible()
    expect(screen.getByLabelText('pomodoros').textContent).toBe(task.pomodoros - 1 < 0 ? "0" : (task.pomodoros - 1).toString())
  })
})

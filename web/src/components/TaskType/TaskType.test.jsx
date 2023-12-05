import { render } from '@redwoodjs/testing/web'

import TaskType from './TaskType'

// This suppresses the annoying console error messages from React about error boundaries
const consoleError = console.error

jest.mock('../../components/FocusTimeModal/FocusTimeModal', () => {
  return () => <div/>;
});

beforeEach(() => {
  console.error = () => {}
})

afterEach(() => {
  console.error = consoleError
})

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
}));

const taskTypeData = [
  {
    "id": 3,
    "title": "Complete Math Homework",
    "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "status": "NotStarted",
    "pomodoros": 2,
    "expanded": false
  },
  {
    "id": 0,
    "title": "Complete Math Homework",
    "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "status": "NotStarted",
    "pomodoros": 3,
    "expanded": false
  }
]

const mockCallback = jest.fn()

describe('TaskType', () => {
  mockCurrentUser({pomodoro: 25})

  it('renders successfully', () => {
    expect(() => {
      render(<TaskType type={'Important'} data={taskTypeData} callback={mockCallback} />)
    }).not.toThrow()

    expect(mockCallback).toBeCalled()
  })

  it('errors thrown when props not passed', () => {
    expect(() => {
      render(<TaskType data={taskTypeData} callback={mockCallback} />)
    }).toThrow()

    expect(() => {
      render(<TaskType type={'Important'} callback={mockCallback} />)
    }).toThrow()

    expect(() => {
      render(<TaskType type={'Important'} data={taskTypeData} />)
    }).toThrow()
  })
})

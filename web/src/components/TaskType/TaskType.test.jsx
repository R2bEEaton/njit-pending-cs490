import { render } from '@redwoodjs/testing/web'

import TaskType from './TaskType'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

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

  it('does not render successfully', () => {
    expect(() => {
      render(<TaskType data={taskTypeData} callback={mockCallback} />)
    }).not.toThrow()

    expect(() => {
      render(<TaskType type={'Important'} callback={mockCallback} />)
    }).toThrow()

    expect(() => {
      render(
        <ErrorBoundary fallback={<ErrorBoundary />}>
          <TaskType type={'Important'} data={taskTypeData} />
        </ErrorBoundary>
      )
    }).toThrow()
  })
})

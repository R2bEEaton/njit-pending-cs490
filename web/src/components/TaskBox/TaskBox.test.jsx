import { render } from '@redwoodjs/testing/web'

import TaskBox from './TaskBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('../TaskType/TaskType', () => {
  return () => <div/>;
});

const mockTaskData = {
  "Top Priority": [
    {
      "id": 1,
      "title": "Complete math homework",
      "notes": "test",
      "pomodoros": 20,
      "expanded": false
    }
  ],
  "Important": [],
  "Other": []
}

describe('TaskBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskBox tasksData={mockTaskData} updateTasksData={jest.fn()}/>)
    }).not.toThrow()
  })
})

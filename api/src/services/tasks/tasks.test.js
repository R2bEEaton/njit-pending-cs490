import { tasks, task, createTask, updateTask, deleteTask } from './tasks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tasks', () => {
  scenario('returns all tasks', async (scenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async (scenario) => {
    const result = await createTask({
      input: {
        date: '2023-11-13T06:14:26.759Z',
        userId: scenario.task.two.userId,
      },
    })

    expect(result.date).toEqual(new Date('2023-11-13T00:00:00.000Z'))
    expect(result.userId).toEqual(scenario.task.two.userId)
  })

  scenario('updates a task', async (scenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: { date: '2023-11-14T06:14:26.759Z' },
    })

    expect(result.date).toEqual(new Date('2023-11-14T00:00:00.000Z'))
  })

  scenario('deletes a task', async (scenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})

import {
  identities,
  identity,
  createIdentity,
  updateIdentity,
  deleteIdentity,
} from './identities'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('identities', () => {
  scenario('returns all identities', async (scenario) => {
    const result = await identities()

    expect(result.length).toEqual(Object.keys(scenario.identity).length)
  })

  scenario('returns a single identity', async (scenario) => {
    const result = await identity({ id: scenario.identity.one.id })

    expect(result).toEqual(scenario.identity.one)
  })

  scenario('creates a identity', async (scenario) => {
    const result = await createIdentity({
      input: {
        provider: 'String',
        uid: 'String',
        userId: scenario.identity.two.userId,
        updatedAt: '2023-10-31T13:28:14.673Z',
      },
    })

    expect(result.provider).toEqual('String')
    expect(result.uid).toEqual('String')
    expect(result.userId).toEqual(scenario.identity.two.userId)
    expect(result.updatedAt).toEqual(new Date('2023-10-31T13:28:14.673Z'))
  })

  scenario('updates a identity', async (scenario) => {
    const original = await identity({
      id: scenario.identity.one.id,
    })
    const result = await updateIdentity({
      id: original.id,
      input: { provider: 'String2' },
    })

    expect(result.provider).toEqual('String2')
  })

  scenario('deletes a identity', async (scenario) => {
    const original = await deleteIdentity({
      id: scenario.identity.one.id,
    })
    const result = await identity({ id: original.id })

    expect(result).toEqual(null)
  })
})

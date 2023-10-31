import { db } from 'src/lib/db'

export const identities = () => {
  return db.identity.findMany()
}

export const identity = ({ id }) => {
  return db.identity.findUnique({
    where: { id },
  })
}

export const createIdentity = ({ input }) => {
  return db.identity.create({
    data: input,
  })
}

export const updateIdentity = ({ id, input }) => {
  return db.identity.update({
    data: input,
    where: { id },
  })
}

export const deleteIdentity = ({ id }) => {
  return db.identity.delete({
    where: { id },
  })
}

export const Identity = {
  user: (_obj, { root }) => {
    return db.identity.findUnique({ where: { id: root?.id } }).user()
  },
}

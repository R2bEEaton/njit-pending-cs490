import CryptoJS from 'crypto-js'
import {logger} from "src/lib/logger";

import { db } from 'src/lib/db'

export const handler = async (event, _context) => {
  switch (event.path) {
    case '/oauth/callback':
      return await callback(event)
    default:
      // Whatever this is, it's not correct, so return "Not Found"
      return {
        statusCode: 404,
      }
  }
}

const callback = async (event) => {
  const { code } = event.queryStringParameters

  const response = await fetch(`https://oauth2.googleapis.com/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
      code: code,
      grant_type: 'authorization_code',
    }),
  })

  const resp = JSON.parse(await response.text())
  const { access_token, refresh_token, expires_in, scope, error } = resp

  if (error) {
    return {
      statuscode: 400,
      body: error,
      error: 'Error: returned statusCode 400',
    }
  }

  try {
    const providerUser = await getProviderUser(access_token)
    const user = await getUser({
      providerUser,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
      scope,
    })
    const cookie = secureCookie(user)

    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': cookie,
        Location: '/',
      },
      error: 'Error: returned status code 302',
    }
  } catch (e) {
    return { statuscode: 500, body: e.message }
  }
}

const secureCookie = (user) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  const cookieAttrs = [
    `Expires=${expires.toUTCString()}`,
    'Path=/',
    'SameSite=Strict',
    `Secure=${process.env.NODE_ENV !== 'development'}`,
  ]
  const data = JSON.stringify({ id: user.id })

  const encrypted = CryptoJS.AES.encrypt(
    data,
    process.env.SESSION_SECRET
  ).toString()

  return [`session=${encrypted}`, ...cookieAttrs].join('; ')
}

const getUser = async ({
  providerUser,
  accessToken,
  refreshToken,
  expiresIn,
  scope,
}) => {
  const { user, identity } = await findOrCreateUser(providerUser)

  let now = new Date()
  let refreshExpiry = new Date(now.getTime() + expiresIn * 1000)

  await db.identity.update({
    where: { id: identity.id },
    data: {
      accessToken,
      refreshToken,
      refreshExpiry,
      scope,
      lastLoginAt: new Date(),
    },
  })

  return user
}

const findOrCreateUser = async (providerUser) => {
  const identity = await db.identity.findFirst({
    where: { provider: 'google', uid: providerUser.sub.toString() },
  })

  if (identity) {
    // identity exists, return the user
    const user = await db.user.findUnique({ where: { id: identity.userId } })
    return { user, identity }
  }

  // identity not found, need to create it and the user
  return db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: providerUser.email,
        firstName: providerUser.given_name,
        lastName: providerUser.family_name,
        picture: providerUser.picture,
      },
    })

    const identity = await tx.identity.create({
      data: {
        userId: user.id,
        provider: 'google',
        uid: providerUser.sub.toString(),
      },
    })

    return { user, identity }
  })
}

const getProviderUser = async (token) => {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return JSON.parse(await response.text())
}

import { logger } from 'src/lib/logger'
import {google} from 'googleapis'
import {authDecoder} from "@redwoodjs/auth-dbauth-api";
import {getCurrentUser} from "src/lib/auth";
import CryptoJS from "crypto-js";

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, context) => {
  logger.info(`${event.httpMethod} ${event.path}: todaysCalendar function`)
  const { userId } = event.queryStringParameters

  let cookies = event.headers.cookie.substring(event.headers.cookie.indexOf("=")+1);
  logger.info(cookies)

  let req = {event, context}

  let session = await authDecoder(userId, 'dbAuth', req)
  logger.info(session)

  const currentUser = await getCurrentUser(session)
  logger.info(JSON.stringify(currentUser))

  let accessToken = CryptoJS.AES.decrypt(currentUser.identities[0].accessToken, process.env.SESSION_SECRET, {iv: "test"}).toString(CryptoJS.enc.Utf8);
  let refreshToken = currentUser.identities[0].refreshToken;
  logger.info(accessToken)

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({version: "v3", auth: oAuth2Client})

  let res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: '2023-01-01T00:00:00Z',
    timeMax: '2024-01-01T00:00:00Z',
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  let calendarEvents = res.data.items

  const events = calendarEvents.map((item, i) => {
    const start = item.start.dateTime || item.start.date
    const end = item.end.dateTime || item.end.date
    const event = {
      summary: item.summary,
      description: item.description,
      start: start,
      end: end,
    }
    return event
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      events
    }),
  }
}

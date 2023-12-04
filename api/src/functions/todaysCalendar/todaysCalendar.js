import { logger } from 'src/lib/logger'
import {google} from 'googleapis'
import {authDecoder} from "@redwoodjs/auth-dbauth-api";
import {getCurrentUser} from "src/lib/auth";
import CryptoJS from "crypto-js";
import moment from "moment";

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

  // Get the current user
  const { userId } = event.queryStringParameters
  const authUser = await authDecoder(userId, 'dbAuth', {event, context})
  const currentUser = await getCurrentUser(authUser)

  // Get and decrypt the access and refresh tokens
  const {accessToken, refreshToken, refreshExpiry} = currentUser.identities[0]
  const accessTokenUnenc = CryptoJS.AES.decrypt(accessToken, process.env.SESSION_SECRET, {iv: "test"}).toString(CryptoJS.enc.Utf8)
  const refreshTokenUnenc = CryptoJS.AES.decrypt(refreshToken, process.env.SESSION_SECRET, {iv: "test"}).toString(CryptoJS.enc.Utf8)

  // Create an oAuth2Client object for interfacing with Google APIs on the user's behalf
  const oAuth2Client = new google.auth.OAuth2()

  oAuth2Client.setCredentials({access_token: accessTokenUnenc})

  /**
   * TODO: Ryan - fix the refresh token thing...
   */

  // Get the calendar
  const calendar = google.calendar({version: "v3", auth: oAuth2Client})

  // Get a list of at most 100 events from today
  let res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: moment().format('YYYY-MM-DD') + "T00:00:00Z",
    timeMax: moment().add(1, 'day').format('YYYY-MM-DD') + "T00:00:00Z",
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })
  let calendarEvents = res.data.items

  // Select useful data, and now the calendar items are in an array called events
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

  /**
   * TODO: Sunfee - at this point, you are gonna want to do the following five things:
   * 1) Get the data into the correct format (the above is close, but some of the names are wrong and missing the
   *    iCalUID, flag for allDay is not properly set, etc.
   *    Need it looking like the example at the top of "Appointments from Google":
   *    https://docs.google.com/document/d/1J5XSi6VjITDM_ejjeDiyTXV4eEykTG87W5aD0nOUMxc/edit?usp=sharing
   * 2) Create a new column in the Tasks database (ask Brendan for info if you need help w/ that)
   * 3) Overwrite the value of that field for the current user for the current day to this array of events.
   * 4) Redirect back to homepage using this return thing below. (Right now it just shows the events)
   * 5) Celebrate!
   */

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

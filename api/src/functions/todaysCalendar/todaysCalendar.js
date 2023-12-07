import {logger} from 'src/lib/logger'
import {google} from 'googleapis'
import {authDecoder} from "@redwoodjs/auth-dbauth-api";
import {getCurrentUser} from "src/lib/auth";
import CryptoJS from "crypto-js";
import moment from "moment";
import {db} from 'src/lib/db';

export const handler = async (event, context) => {
  logger.info(`${event.httpMethod} ${event.path}: todaysCalendar function`)

  // Get the current user
  const { userId, startDate, timeZoneOffset } = event.queryStringParameters
  const timeZone = (Math.sign(parseInt(timeZoneOffset)) ? '-' : '+') + moment.utc(60000 * Math.abs(parseInt(timeZoneOffset))).format("HH:mm")
  const authUser = await authDecoder(userId, 'dbAuth', {event, context})
  const currentUser = await getCurrentUser(authUser)

  // Get and decrypt the access and refresh tokens
  const {id: identityId, accessToken, refreshToken, refreshExpiry} = currentUser.identities[0]
  const refreshTokenUnenc = CryptoJS.AES.decrypt(refreshToken, process.env.SESSION_SECRET, {iv: "test"}).toString(CryptoJS.enc.Utf8)

  // Create an oAuth2Client object for interfacing with Google APIs on the user's behalf
  const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET)

  // If the access token is about to expire, refresh it
  if (moment(refreshExpiry).isSameOrBefore(moment().subtract(10, 'seconds'))) {
    logger.info("refreshing")
    oAuth2Client.setCredentials({
      refresh_token: refreshTokenUnenc
    })
    const accessToken = await oAuth2Client.getAccessToken()
    const accessTokenEnc = CryptoJS.AES.encrypt(
      accessToken.token,
      process.env.SESSION_SECRET,
      {iv: "test"}
    ).toString()
    let token_info = await oAuth2Client.getTokenInfo(accessToken.token)
    await db.identity.update({where: {id: identityId}, data: {accessToken: accessTokenEnc, refreshExpiry: moment(token_info.expiry_date)}})
  } else {
    const accessTokenUnenc = CryptoJS.AES.decrypt(accessToken, process.env.SESSION_SECRET, {iv: "test"}).toString(CryptoJS.enc.Utf8)
    oAuth2Client.setCredentials({
      access_token: accessTokenUnenc
    })
  }

  // Get the calendar
  const calendar = google.calendar({version: "v3", auth: oAuth2Client})

  // Get a list of at most 100 events from today
  let res = await calendar.events.list({
    calendarId: 'primary',
    // Get tasks starting at 5 AM
    timeMin: moment(startDate).format('YYYY-MM-DD') + `T05:00:00${timeZone}`,
    timeMax: moment(startDate).add(1, 'day').format('YYYY-MM-DD') + `T00:00:00${timeZone}`,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  let calendarEvents = res.data.items

  const checkAllDay = (start, end) => {
    return start === 'allDay' && end === 'allDay'
  }
  // Select useful data, and now the calendar items are in an array called events
  const events = calendarEvents.map((item) => {
    const start = item.start.dateTime?.split("T")[1].slice(0, 8) || 'allDay'
    const end = item.end.dateTime?.split("T")[1].slice(0, 8) || 'allDay'
    const allday = checkAllDay(start,end)
    const iCalUID = item.iCalUID
    return {
      summary: item.summary,
      description: item.description,
      startTime: start,
      endTime: end,
      allDay: allday,
      iCalUID: iCalUID,
    }
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

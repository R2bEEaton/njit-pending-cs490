import { logger } from 'src/lib/logger'
import moment from "moment";
import {authDecoder} from "@redwoodjs/auth-dbauth-api";
import {getCurrentUser} from "src/lib/auth";
import {db} from 'src/lib/db';
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
export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: rolloverPreviousTasks function`)
      // Get the current user
      const { userId, startDate, timeZoneOffset } = event.queryStringParameters
      const timeZone = (Math.sign(parseInt(timeZoneOffset)) ? '-' : '+') + moment.utc(60000 * Math.abs(parseInt(timeZoneOffset))).format("HH:mm")
      const authUser = await authDecoder(userId, 'dbAuth', {event, context})
      const currentUser = await getCurrentUser(authUser)
      const tasks = db.user.tasks

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'rolloverPreviousTasks function',
      currentUser
    }),
  }
}

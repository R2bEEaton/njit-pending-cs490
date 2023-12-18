import { logger } from 'src/lib/logger'
import moment from "moment";
import {authDecoder} from "@redwoodjs/auth-dbauth-api";
import {getCurrentUser} from "src/lib/auth";
import {db} from 'src/lib/db';
import { StatDownArrow } from '@chakra-ui/react';
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
  /*function substring(string) {
    var result = '';
    i = 0;
    while (string[i] != "T") result += string[i++];
    return result;
  }*/
  function oldTasks(tasks, today) {
    let result=[];
    let len = tasks.length;
    let i = 0;
    while(i<len){
      if (tasks[i].date<today){
        if (tasks[i].taskList.Other.length > 0 ){
          let l = tasks[i].taskList.Other.length;
          for (let j=0; j<l; j++){
            if (tasks[i].taskList.Other[j].status == "Completed" || tasks[i].taskList.Other[j].status == "Cancelled") continue;
            else result+= JSON.stringify(tasks[i].taskList.Other[j]);
          }
        }//result+= tasks[i].id
        if (tasks[i].taskList.Important.length > 0 ){
          let l = tasks[i].taskList.Important.length;
          for (let j=0; j<l; j++){
            if (tasks[i].taskList.Important[j].status == "Completed" || tasks[i].taskList.Important[j].status == "Cancelled") continue;
            else result+= JSON.stringify(tasks[i].taskList.Important[j]);
          }
        }
        if (tasks[i].taskList["Top Priority"].length > 0 ){
          let l = tasks[i].taskList["Top Priority"].length;
          for (let j=0; j<l; j++){
            if (tasks[i].taskList["Top Priority"][j].status == "Completed" || tasks[i].taskList["Top Priority"][j].status == "Cancelled") continue;
            else result+= JSON.stringify(tasks[i].taskList["Top Priority"][j]);
          }
        }
      } //result+= tasks[i].id;
      i++;
    }
    return result;
  }
  // Get the current user
  const { userId, date} = event.queryStringParameters
  const dd= new Date("2023-12-15")
  const authUser = await authDecoder(userId, 'dbAuth', {event, context})
  const currentUser = await getCurrentUser(authUser)
  const allTasks = currentUser.tasks
  const olTasks = oldTasks(allTasks, dd)
  //const vr = currentUser.tasks[0].taskList["Top Priority"]
  //const f = vr.Other.length

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'rolloverPreviousTasks function',
      date,
      dd,
      allTasks,
      olTasks,
      //vr,
      //f
    }),
  }
}

import { logger } from 'src/lib/logger'
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
  const { userId, date } = event.queryStringParameters
  const dd= new Date(date)

  const most_recent_tasks = await db.task.findFirst({
    where: {
      userId: parseInt(userId),
      NOT: {
        taskList: {equals: {"Other":[],"Important":[],"Top Priority":[]}}
      },
      date: {
        lt: dd
      }
    },
    orderBy: [
      {date: 'desc'}
    ],
    select: {
      taskList: true,
      date: true,
      id: true
    },
  })

  const updated_tasks = JSON.parse(JSON.stringify(most_recent_tasks.taskList));
  for (let type of ["Top Priority", "Important", "Other"]) {
    for (let i = 0; i < updated_tasks[type].length; i++) {
      if (updated_tasks[type][i].status !== "Completed" && updated_tasks[type][i].status !== "Cancelled") {
        updated_tasks[type][i].status = "Rollover"
      }
    }
  }

  let rolled_over = JSON.parse(JSON.stringify(most_recent_tasks.taskList));
  for (let type of ["Top Priority", "Important", "Other"]) {
    for (let i = rolled_over[type].length - 1; i >= 0; i--) {
      if (rolled_over[type][i].status === "Completed" || rolled_over[type][i].status === "Cancelled") {
        rolled_over[type].splice(i, 1);
      } else {
        rolled_over[type][i].status = "NotStarted"
        rolled_over[type][i].pomodorosComplete = 0
      }
    }
  }

  const new_tasks_list = {"Top Priority": [], "Important": [], "Other": []}
  let top_three = [];
  for (let type of ["Top Priority", "Important", "Other"]) {
    for (let i = 0; i < rolled_over[type].length; i++) {
      top_three.push(rolled_over[type][i])
      if (top_three.length >= 3) break;
    }
    if (top_three.length >= 3) break;
  }

  let remaining_important = [];
  let remaining_other = [];
  let skip = top_three.length;
  for (let type of ["Top Priority", "Important", "Other"]) {
    for (let i = 0; i < rolled_over[type].length; i++) {
      if (skip <= 0 && type === "Important") {
        remaining_important.push(rolled_over[type][i])
      }
      if (skip <= 0 && type === "Other") {
        remaining_other.push(rolled_over[type][i])
      }
      skip--;
    }
  }

  if (!remaining_important.length) {
    remaining_important = JSON.parse(JSON.stringify(remaining_other));
    remaining_other = []
  }

  new_tasks_list["Top Priority"] = top_three;
  new_tasks_list["Important"] = remaining_important;
  new_tasks_list["Other"] = remaining_other;

  await db.task.update({
    where: {id: most_recent_tasks.id},
    data: {
      taskList: updated_tasks
    }
  })

  await db.task.update({
    where: {userId_date: {userId: parseInt(userId), date: dd}},
    data: {
      taskList: new_tasks_list
    }
  })


  // //var olTasks = oldTasks(allTasks, dd)/*
  // const vr = currentUser.tasks[1].taskList["Other"][0]
  // vr.status="Rollover"
  //
  // let arr={
  //   ["Top Priority"]:[],
  //   Important:[],
  //   Other:[]
  //
  // }
  // arr['Top Priority'].push(vr)
  // //let rv=vr
  // //const f = vr.Other.length*/

  // return {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     data: 'rolloverPreviousTasks function',
  //     updated_tasks,
  //     new_tasks_list
  //   }),
  // }

  return {
    statusCode: 302,
    headers: {
      Location: '/',
    },
    error: 'Planned day'
  }
}

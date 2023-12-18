import { useEffect, useState } from 'react'

import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import moment from 'moment'
import { setTimeout } from 'worker-timers'

/** A loop for generating random fake appointments */
// for (let i = 0; i < 15; i++) {
//   let startHour = parseInt(Math.random() * 15 + 5)
//
//   appointmentsJSON.push({
//     id: Math.random(),
//     summary: "test",
//     startTime: `${startHour.toString().padStart(2, '0')}:00:00`,
//     endTime: `${(startHour + 1).toString().padStart(2, '0')}:00:00`,
//     allDay: false
//   })
// }
/*
const AppointmentsBox = ({appointmentsJSON, appointmentsTasks}) => {
  // Sort appointments by startTime
  appointmentsJSON.sort((a, b) => {return a.startTime.localeCompare(b.startTime)})
  console.log("log", appointmentsTasks)
  let timeMap = [];
  for (let i = 5; i <= 20; i++) {
    timeMap.push(((i - 1) % 12 + 1) + (i < 12 ? ' AM' : ' PM'))
  }
  console.log(appointmentsJSON)


  // Set highlighted hour on the hour
  const [currentHour, setCurrentHour] = useState(moment().format('h A'));
  useEffect(() => {
    setTimeout(() => {
      setCurrentHour(moment().format('h A'))
    }, moment().startOf('hour').add(1, 'hour').diff(moment(), 'milliseconds') + 1000)
  }, [currentHour]);

  function isTimeBetween(startTime, endTime, targetTime) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(endTime, 'HH:mm:ss')
    let hourAfterStartMoment = moment(startMoment).add(1, 'hour')
    endMoment = moment.max(endMoment, hourAfterStartMoment)
    const targetMoment = moment(targetTime, 'HH:mm:ss')
    return targetMoment.isBetween(startMoment, endMoment, null, '[)')
  }

  /**
   * Algorithm for generating stagger offsets for overlapping appointments! Super proud of this.
   * @returns {*[]}
   */
/*
  function staggerIt() {
      let staggers = [];
      let apptsCopy = appointmentsJSON.filter(({allDay}) => {return !allDay})
      for (let i = 0; i < apptsCopy.length; i++) {
          let lefts = 0;
          for (let j = 0; j < i; j++) {
              lefts += isTimeBetween(apptsCopy[j].startTime, apptsCopy[j].endTime, apptsCopy[i].startTime)
          }
          if (i > 0 && lefts === staggers[i-1]) {
            lefts = 0
          }
          staggers.push(lefts)
      }
      let divideBy = 0;
      for (let i = staggers.length - 1; i >= 0; i--) {
          if (staggers[i] === 0) {divideBy = 0; continue;}

          divideBy = Math.max(staggers[i], divideBy)
          staggers[i] = staggers[i] / (divideBy + 1)
      }
      return staggers;
  }

  const staggerLefts = staggerIt()

  return (
    <Flex flexDirection={'column'} gap={'20px'}>
      <Box hidden={!appointmentsJSON.filter(({allDay}) => {return allDay}).length}>
        <Text><i>All-day Appointments</i></Text>
        <UnorderedList>
        {appointmentsJSON.filter(({allDay}) => {return allDay}).map(({id, summary}) => {
          return (
            <ListItem key={id} color={'#1F1F1F'}>
              {summary}
            </ListItem>
          )
        })}
        </UnorderedList>
      </Box>
      <Box position={'relative'}>
        <Box position={'absolute'} zIndex={'1'} width={'90%'} right={'0'}>
          {appointmentsJSON.filter(({allDay}) => {return !allDay}).map(({id, summary, startTime, endTime, allDay}, idx) => {
            let today = moment().format('YYYY-MM-DD')
            let dayStart = moment(`${today}T05:00:00`)
            let dayEnd = moment(`${today}T20:00:00`)

            let startTimeM = moment(`${today}T${startTime}`)
            // Clamp the end time to be 8 PM
            let endTimeM = moment.min(moment(`${today}T${endTime}`), dayEnd)

            // How many hours after fiveAM does the appointment start?
            let startHour = startTimeM.diff(dayStart, 'minutes') / 60
            // What is the length of the appointment in hours?
            let lengthInHours = endTimeM.diff(startTimeM, 'minutes') / 60

            let staggerLeft = staggerLefts[idx]

            return (
              <Box key={idx}
                   position={'absolute'}
                   outline={'1px solid #E2EAF1'}
                   padding={'10px'}
                   minHeight={'44px'}
                   height={`calc(44px * ${lengthInHours})`}
                   mt={`calc((44px * ${startHour}) + 8.5px)`}
                   backgroundColor={'#FFF'}
                   color={'#1F1F1F'}
                   fontSize={'14px'}
                   fontWeight={'500'}
                   lineHeight={'17px'}
                   width={`calc(100% - (100% * ${staggerLeft}))`}
                   ml={`calc(100% * ${staggerLeft})`}
                   _hover={{backgroundColor: '#FAFAFA'}}
              >
                {summary}
              </Box>
            )
          })}
        </Box>
        <Flex flexDirection={'column'} gap={'27px'} fontSize={'14px'} fontWeight={'400'}
              lineHeight={'17px'} color={'#1F1F1F'} alignItems={'flex-start'}>
          {timeMap.map((time, idx) => {
            return (
              <Text key={idx} color={time === currentHour ? '#6284FF' : ''}
                    outline={time === currentHour ? '1px solid #6284FF' : ''}
                    outlineOffset={'2px'} padding={'0px 4px'} borderRadius={'6px'}
                    flexShrink={1} userSelect={'none'}>{time}</Text>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default AppointmentsBox
*/

const AppointmentsBox = ({
  appointmentsJSON,
  appointmentsTasks,
  setScheduledItems,
}) => {
  // Sort appointments by startTime
  const updatedAppointmentTasks = {}

  for (const category in appointmentsTasks) {
    if (appointmentsTasks.hasOwnProperty(category)) {
      updatedAppointmentTasks[category] = appointmentsTasks[category].map(
        (task) => {
          return {
            ...task,
            summary: task.title, // Add a new field "summary" with the value of "title"
          }
        }
      )
    }
  }

  // Now, updatedAppointmentTasks has the new "summary" field
  console.log(updatedAppointmentTasks)

  // Sort all items by startTime
  appointmentsJSON.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })
  console.log('log', appointmentsTasks)
  let timeMap = []
  for (let i = 5; i <= 20; i++) {
    timeMap.push(((i - 1) % 12) + 1 + (i < 12 ? ' AM' : ' PM'))
  }
  console.log(appointmentsJSON)

  // Set highlighted hour on the hour
  const [currentHour, setCurrentHour] = useState(moment().format('h A'))
  useEffect(() => {
    setTimeout(() => {
      setCurrentHour(moment().format('h A'))
    }, moment().startOf('hour').add(1, 'hour').diff(moment(), 'milliseconds') + 1000)
  }, [currentHour])

  function isTimeBetween(startTime, endTime, targetTime) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(endTime, 'HH:mm:ss')
    let hourAfterStartMoment = moment(startMoment).add(1, 'hour')
    endMoment = moment.max(endMoment, hourAfterStartMoment)
    const targetMoment = moment(targetTime, 'HH:mm:ss')
    return targetMoment.isBetween(startMoment, endMoment, null, '[)')
  }
  function isFoucsTimeBetween(startTime, endTime, targetTime) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(endTime, 'HH:mm:ss')
    //let hourAfterStartMoment = moment(startMoment).add(1, 'hour')
    //endMoment = moment.max(endMoment, hourAfterStartMoment)
    const targetMoment = moment(targetTime, 'HH:mm:ss')
    return targetMoment.isBetween(startMoment, endMoment, null, '[)')
  }
  function isEndTimeBetween(startTime, endTime, targetTime, focusLength) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(endTime, 'HH:mm:ss')
    let hourAfterStartMoment = moment(startMoment).add(1, 'hour')
    endMoment = moment.max(endMoment, endMoment)
    let targetMoment = moment(targetTime, 'HH:mm:ss')
    const endTargetMoment = moment(targetMoment).add(focusLength, 'hour')

    return endTargetMoment.isBetween(startMoment, endMoment, null, '[)')
  }
  function isEndTimeEqual(startTime, endTime, targetTime, focusLength) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(endTime, 'HH:mm:ss')
    let hourAfterStartMoment = moment(startMoment).add(1, 'hour')
    endMoment = moment.max(endMoment, endMoment)
    let targetMoment = moment(targetTime, 'HH:mm:ss')
    const endTargetMoment = moment(targetMoment).add(focusLength, 'hour')
    return endTargetMoment.isSame(endMoment)
  }
  function isAppointmentBetween(startTime, focusLength, targetTime) {
    let startMoment = moment(startTime, 'HH:mm:ss')
    let endMoment = moment(startMoment).add(focusLength, 'hour')
    let targetMoment = moment(targetTime, 'HH:mm:ss')
    return targetMoment.isBetween(startMoment, endMoment, null, '[)')
  }
  /**
   * Algorithm for generating stagger offsets for overlapping appointments! Super proud of this.
   * @returns {*[]}
   */

  function staggerIt() {
    let staggers = []
    let apptsCopy = appointmentsJSON.filter(({ allDay }) => {
      return !allDay
    })
    for (let i = 0; i < apptsCopy.length; i++) {
      let lefts = 0
      for (let j = 0; j < i; j++) {
        lefts += isTimeBetween(
          apptsCopy[j].startTime,
          apptsCopy[j].endTime,
          apptsCopy[i].startTime
        )
      }
      if (i > 0 && lefts === staggers[i - 1]) {
        lefts = 0
      }
      staggers.push(lefts)
    }
    let divideBy = 0
    for (let i = staggers.length - 1; i >= 0; i--) {
      if (staggers[i] === 0) {
        divideBy = 0
        continue
      }

      divideBy = Math.max(staggers[i], divideBy)
      staggers[i] = staggers[i] / (divideBy + 1)
    }
    return staggers
  }

  const staggerLefts = staggerIt()
  function flattenTasks(tasks) {
    return Object.values(tasks).flatMap((taskList) => taskList)
  }
  function scheduleTasks(items) {
    let currentTime = moment().startOf('day').add(5, 'hours') // Start scheduling from 5 AM
    const scheduledItems = []

    items.forEach((item) => {
      if (!item.startTime) {
        let focusLength = item.pomodoros

        // Task doesn't have a predefined start time

        // Check if there's enough time for the item
        while (
          scheduledItems.some(
            (scheduledItem) =>
              isFoucsTimeBetween(
                scheduledItem.startTime,
                scheduledItem.endTime,
                currentTime.format('HH:mm:ss')
              ) ||
              isAppointmentBetween(
                currentTime.format('HH:mm:ss'),
                focusLength,
                scheduledItem.startTime
              ) ||
              isEndTimeBetween(
                scheduledItem.startTime,
                scheduledItem.endTime,
                currentTime.format('HH:mm:ss'),
                focusLength
              ) ||
              isEndTimeEqual(
                scheduledItem.startTime,
                scheduledItem.endTime,
                currentTime.format('HH:mm:ss'),
                focusLength
              )
          )
        ) {
          currentTime.add(15, 'minutes') // Move to the next 15-minute interval if there's a conflict
        }
        const scheduledItem = {
          ...item,
          startTime: currentTime.format('HH:mm:ss'),
          endTime: currentTime.add(focusLength, 'hours').format('HH:mm:ss'),
        }

        // Schedule the item

        scheduledItems.push(scheduledItem)
      } else {
        // Appointment has a predefined start time, keep it unchanged
        scheduledItems.push(item)
      }
    })

    return scheduledItems
  }

  const allItems = [
    ...appointmentsJSON,
    ...flattenTasks(updatedAppointmentTasks),
  ]
  const scheduledItems = scheduleTasks(allItems)
  //allItems.sort((a, b) => a.startTime.localeCompare(b.startTime));
  console.log(scheduledItems)
  useEffect(() => {
    setScheduledItems(scheduledItems)
  })
  return (
    <Flex flexDirection={'column'} gap={'20px'}>
      <Box
        hidden={
          !scheduledItems.filter(({ allDay }) => {
            return allDay
          }).length
        }
      >
        <Text>
          <i>All-day Appointments</i>
        </Text>
        <UnorderedList>
          {scheduledItems
            .filter(({ allDay }) => {
              return allDay
            })
            .map(({ id, summary }) => {
              return (
                <ListItem key={id} color={'#1F1F1F'}>
                  {summary}
                </ListItem>
              )
            })}
        </UnorderedList>
      </Box>
      <Box position={'relative'}>
        <Box position={'absolute'} zIndex={'1'} width={'90%'} right={'0'}>
          {scheduledItems
            .filter(({ allDay }) => {
              return !allDay
            })
            .map(({ id, summary, startTime, endTime, allDay }, idx) => {
              let today = moment().format('YYYY-MM-DD')
              let dayStart = moment(`${today}T05:00:00`)
              let dayEnd = moment(`${today}T20:00:00`)

              let startTimeM = moment(`${today}T${startTime}`)
              // Clamp the end time to be 8 PM
              let endTimeM = moment.min(moment(`${today}T${endTime}`), dayEnd)

              // How many hours after fiveAM does the appointment start?
              let startHour = startTimeM.diff(dayStart, 'minutes') / 60
              // What is the length of the appointment in hours?
              let lengthInHours = endTimeM.diff(startTimeM, 'minutes') / 60

              let staggerLeft = staggerLefts[idx]

              return (
                <Box
                  key={idx}
                  position={'absolute'}
                  outline={'1px solid #E2EAF1'}
                  padding={'10px'}
                  minHeight={'44px'}
                  height={`calc(44px * ${lengthInHours})`}
                  mt={`calc((44px * ${startHour}) + 8.5px)`}
                  backgroundColor={'#FFF'}
                  color={'#1F1F1F'}
                  fontSize={'14px'}
                  fontWeight={'500'}
                  lineHeight={'17px'}
                  width={`calc(100% - (100% * ${staggerLeft}))`}
                  ml={`calc(100% * ${staggerLeft})`}
                  _hover={{ backgroundColor: '#FAFAFA' }}
                >
                  {summary}
                </Box>
              )
            })}
        </Box>
        <Flex
          flexDirection={'column'}
          gap={'27px'}
          fontSize={'14px'}
          fontWeight={'400'}
          lineHeight={'17px'}
          color={'#1F1F1F'}
          alignItems={'flex-start'}
        >
          {timeMap.map((time, idx) => {
            return (
              <Text
                key={idx}
                color={time === currentHour ? '#6284FF' : ''}
                outline={time === currentHour ? '1px solid #6284FF' : ''}
                outlineOffset={'2px'}
                padding={'0px 4px'}
                borderRadius={'6px'}
                flexShrink={1}
                userSelect={'none'}
              >
                {time}
              </Text>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default AppointmentsBox

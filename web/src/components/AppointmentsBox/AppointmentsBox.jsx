import {Box, Flex, ListItem, Text, UnorderedList} from "@chakra-ui/react"
import moment from "moment"
import {useEffect, useState} from "react"
import {setTimeout} from 'worker-timers'

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

const AppointmentsBox = ({appointmentsJSON}) => {
  // Sort appointments by startTime
  appointmentsJSON.sort((a, b) => {return a.startTime.localeCompare(b.startTime)})

  let timeMap = [];
  for (let i = 5; i <= 20; i++) {
    timeMap.push(((i - 1) % 12 + 1) + (i < 12 ? ' AM' : ' PM'))
  }

  const [currentHour, setCurrentHour] = useState(moment().format('h A'));

  /**
   * Set highlighted hour on the hour. This is currently broken due to setTimeout going to sleep when the browser is slept.
   */
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
      console.log(staggers)
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

            const [completed, setCompleted] = useState(false)
            setTimeout(() => {
              setCompleted(true)
            }, endTimeM.diff(moment(), 'milliseconds'))

            // {completed > 0 && completed < 1 ? <Progress hasStripe value={completed * 100} size='xs' color={'#6284FF'} /> : ''}

            return (
              <Box key={id}
                   position={'absolute'}
                   outline={'1px solid #E2EAF1'}
                   padding={'10px'}
                   minHeight={'44px'}
                   height={`calc(44px * ${lengthInHours})`}
                   mt={`calc((44px * ${startHour}) + 8.5px)`}
                   backgroundColor={'#FFF'}
                   color={'#1F1F1F'}
                   fontSize={'14px'}
                   fontStyle={'normal'}
                   fontWeight={'500'}
                   lineHeight={'17px'}
                   textDecoration={completed ? 'line-through' : ''}
                   width={`calc(100% - (100% * ${staggerLeft}))`}
                   ml={`calc(100% * ${staggerLeft})`}
                   //zIndex={completed > 0 && completed < 1 ? 101 : (staggerLeft * 100).toFixed(0)}
                   //boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.05)'}
                   _hover={{backgroundColor: '#FAFAFA'}}
                   //userSelect={'none'}
              >
                {summary}
              </Box>
            )
          })}
        </Box>
        <Flex flexDirection={'column'} gap={'27px'} fontSize={'14px'} fonstStyle={'normal'} fontWeight={'400'}
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

import {Box, Flex, Progress, Text} from "@chakra-ui/react"
import moment from "moment"
import {useEffect, useState} from "react"
import {setTimeout} from 'worker-timers'

const dummyAppointments = [
  {
    "id": 1,
    "summary": "Meeting with Counselor",
    "startTime": "12:45:00",
    "endTime": "15:45:00",
    "allDay": false
  },
  {
    "id": 2,
    "summary": "Meeting with Teammates",
    "startTime": "13:15:00",
    "endTime": "14:00:00",
    "allDay": false
  },
  {
    "id": 3,
    "summary": "Meeting with Counselor",
    "startTime": "13:30:00",
    "endTime": "14:30:00",
    "allDay": false
  },
  {
    "id": 4,
    "summary": "Meeting with Counselor",
    "startTime": "14:45:00",
    "endTime": "16:00:00",
    "allDay": false
  },
  {
      "id": 5,
      "summary": "Meeting with Counselor",
      "startTime": "19:00:00",
      "endTime": "19:30:00",
      "allDay": false
  },
  {
      "id": 6,
      "summary": "Meeting with Counselor",
      "startTime": "19:30:00",
      "endTime": "21:00:00",
      "allDay": false
  },
    {
        "id": 7,
        "summary": "Meeting with Counselor",
        "startTime": "18:00:00",
        "endTime": "18:30:00",
        "allDay": false
    },
]

/** A loop for generating random fake appointments */
// for (let i = 0; i < 15; i++) {
//   let startHour = parseInt(Math.random() * 15 + 5)
//
//   dummyAppointments.push({
//     id: Math.random(),
//     summary: "test",
//     startTime: `${startHour.toString().padStart(2, '0')}:00:00`,
//     endTime: `${(startHour + 1).toString().padStart(2, '0')}:00:00`,
//     allDay: false
//   })
// }

// Sort appointments by startTime
dummyAppointments.sort((a, b) => {return a.startTime.localeCompare(b.startTime)})

const AppointmentsBox = () => {
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
      for (let i = 0; i < dummyAppointments.length; i++) {
          let lefts = 0;
          for (let j = 0; j < i; j++) {
              lefts += isTimeBetween(dummyAppointments[j].startTime, dummyAppointments[j].endTime, dummyAppointments[i].startTime)
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
    <Box position={'relative'}>
      <Box position={'absolute'} zIndex={'1'} width={'90%'} right={'0'}>
        {dummyAppointments.map(({id, summary, startTime, endTime, allDay}, idx) => {
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

          let staggerLeft =staggerLefts[idx]

          let completed;
          if (moment().isAfter(endTimeM)) {
            completed = 1
          } else if (moment().isBefore(startTimeM)) {
            completed = 0
          } else {
            completed = (moment().diff(startTimeM, 'minutes') / 60) / lengthInHours
          }

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
                 width={`calc(100% - (100% * ${staggerLeft}))`}
                 ml={`calc(100% * ${staggerLeft})`}
                 zIndex={idx}
                 //boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.05)'}
                 _hover={{backgroundColor: '#FAFAFA'}}
                 userSelect={'none'}
            >
                {completed > 0 && completed < 1 ? <Progress hasStripe value={completed * 100} size='xs' color={'#6284FF'} bottom={'0px'} /> : ''}
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
  )
}

export default AppointmentsBox

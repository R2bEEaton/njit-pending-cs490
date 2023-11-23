import {Box, Flex, Text} from "@chakra-ui/react"
import moment from "moment"
import {useEffect, useState} from "react"
import {clearInterval, clearTimeout, setInterval, setTimeout} from 'worker-timers'

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
  }
]

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
    const startMoment = moment(startTime, 'HH:mm:ss');
    const endMoment = moment(endTime, 'HH:mm:ss');
    const targetMoment = moment(targetTime, 'HH:mm:ss');

    return targetMoment.isBetween(startMoment, endMoment, null, '[)');
  }

  function staggerIt(idx) {
    let staggerLefts = []
    for (let i = 0; i < dummyAppointments.length; i++) {
      let lefts = 0;
      for (let j = 0; j < i; j++) {
        lefts += isTimeBetween(dummyAppointments[j].startTime, dummyAppointments[j].endTime, dummyAppointments[i].startTime)
      }
      staggerLefts.push(lefts / 2)
    }
    return [idx, staggerLefts[idx] / 2]
  }

  return (
    <Box position={'relative'}>
      <Box position={'absolute'} zIndex={'1'} width={'90%'} right={'0'}>
        {dummyAppointments.map(({id, summary, startTime, endTime, allDay}, idx) => {
          let today = moment().format('YYYY-MM-DD')
          let fiveAM = moment(`${today}T05:00:00`)
          let startTimeM = moment(`${today}T${startTime}`)
          let endTimeM = moment(`${today}T${endTime}`)

          let startHour = startTimeM.diff(fiveAM, 'minutes') / 60
          let lengthInHours = endTimeM.diff(startTimeM, 'minutes') / 60

          let [overlapIndex, staggerLeft] = staggerIt(idx);

          return (
            <Box key={id}
                 position={'absolute'}
                 outline={'1px solid #E2EAF1'}
                 padding={'10px'}
                 minHeight={'44px'}
                 mt={`calc((44px * ${startHour}) + 8.5px)`}
                 height={`calc(44px * ${lengthInHours})`}
                 backgroundColor={'#FFF'}
                 color={'#1F1F1F'}
                 fontSize={'14px'}
                 fontStyle={'normal'}
                 fontWeight={'500'}
                 lineHeight={'17px'}
                 width={`calc(100% - (100% * ${staggerLeft}))`}
                 ml={`calc(100% * ${staggerLeft})`}
                 zIndex={overlapIndex}
                 //boxShadow={'2px 5px 50px 0px rgba(36, 37, 40, 0.05)'}
                 //_hover={{zIndex: '10', opacity: 0.9, backgroundColor: '#FAFAFA'}}
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
                  flexShrink={1}>{time}</Text>
          )
        })}
      </Flex>
    </Box>
  )
}

export default AppointmentsBox

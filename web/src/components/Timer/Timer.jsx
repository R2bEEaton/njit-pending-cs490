import { useEffect, useState } from 'react'

import { Button } from '@chakra-ui/react'
import { setInterval, clearInterval } from 'worker-timers'

const Timer = ({ numMinutes }) => {
  const [minutes, setMinutes] = useState(numMinutes)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (minutes === 0 && seconds === 0) return
    const timer = setInterval(() => {
      if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1)
        setSeconds(59)
      } else setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [minutes, seconds])

  return (
    <p>
      {' '}
      Timer: {minutes}:{seconds < 10 ? '0' + seconds : seconds}{' '}
    </p>
  )
}

export default Timer

import { useEffect, useState } from 'react'

import { Button } from '@chakra-ui/react'

const Timer = ({ secondsProp }) => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(secondsProp)

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) return
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds])

  return <p> Timer: {seconds} </p>
}

export default Timer

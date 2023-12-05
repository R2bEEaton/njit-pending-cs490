import { useEffect, useState } from 'react'

import { Button } from '@chakra-ui/react'
import { setInterval, clearInterval } from 'worker-timers'

const Timer = ({
  isPomo,
  numPomos,
  numMinutes,
  numPomosComplete,
  updateNumPomosComplete,
}) => {
  const [minutes, setMinutes] = useState(numMinutes)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPomodoro, setIsPomodoro] = useState(isPomo)

  useEffect(() => {
    let timer
    if (minutes === 0 && seconds === 0) {
      if (isPomodoro) updateNumPomosComplete(numPomosComplete + 1)
    }
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1)
          setSeconds(59)
        } else setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [
    isPomodoro,
    numPomos,
    isRunning,
    minutes,
    seconds,
    //numPomosComplete,
    //updateNumPomosComplete,
  ])

  //useEffect(() => {
  /*const startTimer = () => {
    let timer
    timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        if (isPomodoro) updateNumPomosComplete(numPomosComplete + 1)
        clearInterval(timer)
      }
      if (minutes > 0 || seconds > 0) {
        console.log(minutes + ':' + seconds)
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1)
          setSeconds(59)
        } else setSeconds((prevSeconds) => prevSeconds - 1)
      }
    }, 1000)
  }

  //}, [])*/

  //return () => clearInterval(timer)
  return (
    <div>
      <p>
        {minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </p>
      <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
        start
      </Button>
    </div>
  )
}

export default Timer

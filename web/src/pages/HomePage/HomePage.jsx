import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DatePicker from 'src/components/DatePicker'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [date, setDate] = useState()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <DatePicker setDateProp={setDate} />
      {isAuthenticated ? (
        <p>{currentUser ? currentUser.email : ''}</p>
      ) : (
        <p>nothing to see here</p>
      )}
    </>
  )
}

export default HomePage

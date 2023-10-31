import { useState, useEffect } from 'react'

import { Link, Redirect, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  // Use a state variable to track whether the toast notification has been shown
  const [showNotification, setShowNotification] = useState(false)

  // Check if it's the user's first visit to the homepage during this session
  useEffect(() => {
    const hasVisitedHomepage = sessionStorage.getItem('visitedHomepage')

    if (!hasVisitedHomepage) {
      // Show the toast notification
      toast.success('Welcome to the homepage!')

      // Update the flag to indicate that the notification has been shown
      sessionStorage.setItem('visitedHomepage', 'true')
      setShowNotification(true)
    }
  }, [])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Toaster />
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.jsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>

      {isAuthenticated ? (
        <p>{currentUser ? currentUser.email : ''}</p>
      ) : (
        <p>nothing to see here</p>
      )}
    </>
  )
}

export default HomePage
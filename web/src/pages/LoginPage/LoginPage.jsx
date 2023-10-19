import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (isAuthenticated) return (
    <>
      <p>You are authenticated as <b>{currentUser.email}</b></p>
    </>
  )

  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <h1>LoginPage</h1>
      <p>
        Find me in <code>./web/src/pages/LoginPage/LoginPage.jsx</code>
      </p>
      <p>
        My default route is named <code>login</code>, link to me with `
        <Link to={routes.login()}>Login</Link>`
      </p>

      {/*
        TODO:
        Style this link to be a Google login button
      */}
      <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.GOOGLE_OAUTH_SCOPES}&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`}>
        Login with Google
      </a>
    </>
  )
}

export default LoginPage

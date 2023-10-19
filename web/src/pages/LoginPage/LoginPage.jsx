import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from "src/auth";

const LoginPage = () => {
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

      <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar.events.readonly%20https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`}
         className="mx-auto block w-48 rounded bg-gray-800 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
        Login with Google
      </a>
    </>
  )
}

export default LoginPage

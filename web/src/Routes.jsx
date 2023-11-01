// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout/MainLayout'
import HomePage from 'src/pages/HomePage/HomePage'
import SettingsPage from 'src/pages/SettingsPage/SettingsPage'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      {/* Put all authenticated routes in here, the user will be redirected to login if they are not */}
      <Private unauthenticated="login" wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/settings" page={SettingsPage} name="settings" />
        <Route path="/tasks" page={TasksPage} name="tasks" />
      </Private>
      <Route path="/login" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} name="notfoundpage" />
    </Router>
  )
}

export default Routes

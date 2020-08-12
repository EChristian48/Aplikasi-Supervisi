import * as React from 'react'
import { CssBaseline } from '@material-ui/core'

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { LoginPage } from './pages/LoginPage'
import { NeedAuth } from './components/NeedAuth'
import { HomePage } from './pages/HomePage'

const App: React.FC = () => {
  const user = useAuth()
  console.log(user)

  return (
    <CssBaseline>
      <Router>
        <Switch>
          {user && <Redirect from='/login' to='/' />}

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/'>
            <NeedAuth user={user}>
              <HomePage />
            </NeedAuth>
          </Route>
        </Switch>
      </Router>
    </CssBaseline>
  )
}

export { App }

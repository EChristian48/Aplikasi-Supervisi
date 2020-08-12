import * as React from 'react'
import { Button, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

import * as firebase from 'firebase/app'
import 'firebase/auth'
class HomePage extends React.Component {
  render() {
    return (
      <>
        <AppBar position='static'>
          <Toolbar>
            <IconButton>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Button onClick={() => firebase.auth().signOut()}>Logout</Button>
      </>
    )
  }
}

export { HomePage }

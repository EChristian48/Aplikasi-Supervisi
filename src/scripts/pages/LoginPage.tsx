import * as React from 'react'

import {
  Button,
  Grid,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Alert } from '../components/Alert'

type LoginPageState = {
  [x: string]: any
  loginInfo: {
    failed: boolean
    message: string
  }
}

class LoginPage extends React.Component<{}, LoginPageState> {
  state: LoginPageState = {
    email: '',
    password: '',
    loginInfo: { failed: false, message: '' },
  }
  login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state['email'], this.state['password'])
      .catch(e =>
        this.setState({
          loginInfo: {
            failed: true,
            message: e.message,
          },
        })
      )
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  closeDialog = () => {
    this.setState({
      loginInfo: { failed: false, message: '' },
    })
  }

  render() {
    return (
      <Container>
        <Alert
          onClose={this.closeDialog}
          open={this.state.loginInfo.failed}
          title='Gagal Login'>
          {this.state.loginInfo.message}
        </Alert>

        <Grid
          container
          alignItems='center'
          justify='center'
          className='full-height'>
          <form onSubmit={this.login}>
            <Grid container direction='column'>
              <TextField
                type='email'
                variant='outlined'
                label='E-Mail'
                size='small'
                style={{ marginBottom: '10px' }}
                name='email'
                onChange={this.handleChange}
                value={this.state['email']}
              />
              <TextField
                type='password'
                variant='outlined'
                label='Password'
                size='small'
                name='password'
                style={{ marginBottom: '10px' }}
                onChange={this.handleChange}
                value={this.state['password']}
              />

              <Button variant='contained' color='primary' type='submit'>
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    )
  }
}

export { LoginPage }

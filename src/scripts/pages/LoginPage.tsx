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
  TableRow,
  TableCell,
} from '@material-ui/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Alert } from '../components/Alert'
import { DocTable } from '../components/DocTable'
import { GuruDokumen } from './guru/GuruDokumen'

type LoginPageState = {
  [x: string]: any
  loginInfo: {
    failed: boolean
    message: string
  }
  isDialogOpen: boolean
}

const akun = [
  { role: 'Guru', username: 'guru@guru.com', password: 'guruguru' },
  { role: 'Guru', username: 'guru2@guru.com', password: 'guruguru' },
  {
    role: 'Supervisor',
    username: 'supervisor@supervisor.com',
    password: 'supervisorsupervisor',
  },
  {
    role: 'Kurikulum',
    username: 'kurikulum@kurikulum.com',
    password: 'kurikulumkurikulum',
  },
  {
    role: 'Kepsek',
    username: 'kepsek@kepsek.com',
    password: 'kepsekkepsek',
  },
]

class LoginPage extends React.Component<{}, LoginPageState> {
  state: LoginPageState = {
    email: '',
    password: '',
    loginInfo: { failed: false, message: '' },
    isDialogOpen: false,
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

              <Button
                variant='outlined'
                color='primary'
                onClick={() => this.setState({ isDialogOpen: true })}>
                List Akun
              </Button>
            </Grid>
          </form>
        </Grid>

        <Dialog
          open={this.state.isDialogOpen}
          onClose={() => this.setState({ isDialogOpen: false })}>
          <DialogTitle>List Akun</DialogTitle>
          <DialogContent>
            <DocTable headers={['Role', 'Username', 'Password']}>
              {akun.map(akun => (
                <TableRow>
                  <TableCell>{akun.role}</TableCell>
                  <TableCell>{akun.username}</TableCell>
                  <TableCell>{akun.password}</TableCell>
                </TableRow>
              ))}
            </DocTable>
            <DialogContentText>
              Note: Aplikasi ini belum dikasih database {'&'} storage rules,
              jadi masih belum aman walau ada login, tapi fungsionalitas sudah
              70%, kalau buat polishing masih belum
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
    )
  }
}

export { LoginPage }

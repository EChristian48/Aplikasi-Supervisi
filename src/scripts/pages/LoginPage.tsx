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

import { auth } from 'firebase/app'
import { Alert } from '../components/Alert'
import { BasicTable } from '../components/BasicTable'

const accountList = [
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

type LoginState = 'failed' | 'loading'
type LoginResult = {
  state: LoginState
  message: string
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [LoginStatus, setLoginStatus] = React.useState<LoginResult>()
  const [isAccListOpen, setAccListOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login().catch(error =>
      setLoginStatus({
        state: 'failed',
        message: error.message,
      })
    )
  }

  const login = () => {
    setLoginStatus({
      state: 'loading',
      message: '',
    })
    return auth().signInWithEmailAndPassword(email, password)
  }

  const clearLoginStatus = () => setLoginStatus(undefined)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const openAccList = () => setAccListOpen(true)
  const closeAccList = () => setAccListOpen(false)

  return (
    <Container>
      <Alert
        onClose={clearLoginStatus}
        open={LoginStatus?.state === 'failed'}
        title='Gagal Login'>
        {LoginStatus?.message}
      </Alert>

      <Grid
        container
        alignItems='center'
        justify='center'
        className='full-height'>
        <form onSubmit={handleSubmit}>
          <Grid container direction='column'>
            <TextField
              type='email'
              variant='outlined'
              label='E-Mail'
              size='small'
              style={{ marginBottom: '10px' }}
              name='email'
              onChange={handleEmail}
              value={email}
            />
            <TextField
              type='password'
              variant='outlined'
              label='Password'
              size='small'
              name='password'
              style={{ marginBottom: '10px' }}
              onChange={handlePassword}
              value={password}
            />

            <Button variant='contained' color='primary' type='submit'>
              Login
            </Button>

            <Button variant='outlined' color='primary' onClick={openAccList}>
              List Akun
            </Button>
          </Grid>
        </form>
      </Grid>

      <Dialog open={isAccListOpen} onClose={closeAccList}>
        <DialogTitle>List Akun</DialogTitle>
        <DialogContent>
          <BasicTable headers={['Role', 'Username', 'Password']}>
            {accountList.map(account => (
              <TableRow key={account.username}>
                <TableCell>{account.role}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.password}</TableCell>
              </TableRow>
            ))}
          </BasicTable>
          <DialogContentText>
            Note: Aplikasi ini belum dikasih database {'&'} storage rules, jadi
            masih belum aman walau ada login, tapi fungsionalitas sudah 70%,
            kalau buat polishing masih belum
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export { LoginPage }

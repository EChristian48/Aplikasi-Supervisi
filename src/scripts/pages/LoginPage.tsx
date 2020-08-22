import * as React from 'react'

import {
  Button,
  Grid,
  Container,
  TextField,
  TableRow,
  TableCell,
  makeStyles,
  createStyles,
} from '@material-ui/core'

import { auth } from 'firebase/app'
import { BasicDialog } from '../components/BasicDialog'
import { BasicTable } from '../components/BasicTable'
import { LoadingBanner } from '../components/LoadingBanner'

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

const useStyles = makeStyles(theme =>
  createStyles({
    marginBot2: {
      marginBottom: theme.spacing(2),
    },
    marginTop2: {
      marginTop: theme.spacing(2),
    },
  })
)

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

  const classes = useStyles()

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
    <>
      <LoadingBanner open={LoginStatus?.state === 'loading'} />

      <Container>
        <BasicDialog
          onClose={clearLoginStatus}
          open={LoginStatus?.state === 'failed'}
          title='Gagal Login'
          text={LoginStatus?.message}
        />

        <Grid
          container
          alignItems='center'
          justify='center'
          className='full-height'
          direction='column'>
          <form onSubmit={handleSubmit}>
            <Grid container direction='column'>
              <TextField
                type='email'
                variant='outlined'
                label='E-Mail'
                size='small'
                className={classes.marginBot2}
                onChange={handleEmail}
                value={email}
              />
              <TextField
                type='password'
                variant='outlined'
                label='Password'
                size='small'
                className={classes.marginBot2}
                onChange={handlePassword}
                value={password}
              />

              <Button variant='contained' color='primary' type='submit'>
                Login
              </Button>
            </Grid>
          </form>

          <Button
            variant='outlined'
            color='primary'
            onClick={openAccList}
            className={classes.marginTop2}>
            List Akun
          </Button>
        </Grid>

        <BasicDialog
          onClose={closeAccList}
          open={isAccListOpen}
          title='List Akun'
          text='Note: Belum ada firestore/storage rules, Polishing on progress'>
          <BasicTable headers={['Role', 'Username', 'Password']}>
            {accountList.map(account => (
              <TableRow key={account.username}>
                <TableCell>{account.role}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.password}</TableCell>
              </TableRow>
            ))}
          </BasicTable>
        </BasicDialog>
      </Container>
    </>
  )
}

export { LoginPage }

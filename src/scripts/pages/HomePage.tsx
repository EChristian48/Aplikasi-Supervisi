import * as React from 'react'
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {
  Menu,
  PowerSettingsNew,
  Description,
  AccountCircle,
  Schedule,
} from '@material-ui/icons'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import { Role } from '../dataSchema'
import { Switch, Route } from 'react-router-dom'
import { GuruDokumen } from './guru/GuruDokumen'

import DateFns from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SuperDocs } from './supervisor/SuperDocs'
import { Jadwal } from './kurikulum/Jadwal'

type Menu = {
  icon: JSX.Element
  name: string
  role: Role
  link: string
}

const menus: Menu[] = [
  {
    icon: <Description />,
    name: 'Dokumen Pembelajaran',
    role: 'guru',
    link: '#/guru/upload',
  },
  {
    icon: <Description />,
    name: 'Daftar Dokumen',
    role: 'supervisor',
    link: '#/supervisor/dokumen',
  },
  {
    icon: <AccountCircle />,
    name: 'Pilih Supervisor',
    role: 'kurikulum',
    link: '#/kurikulum/supervisor',
  },
  {
    icon: <Schedule />,
    name: 'Daftar Jadwal',
    role: 'kurikulum',
    link: '#/kurikulum/jadwal',
  },
  {
    icon: <Description />,
    name: 'Lihat Laporan',
    role: 'kepsek',
    link: '#/kepsek/laporan',
  },
]

type HomePageState = {
  isDrawerOpen: boolean
}

type HomePageProps = {
  userRole: Role
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  state: HomePageState = {
    isDrawerOpen: false,
  }

  closeDrawer = () => {
    this.setState({
      isDrawerOpen: false,
    })
  }

  openDrawer = () => {
    this.setState({
      isDrawerOpen: true,
    })
  }

  render() {
    return (
      <>
        <Backdrop open={!this.props.userRole}>
          <CircularProgress />
        </Backdrop>

        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' onClick={this.openDrawer}>
              <Menu />
            </IconButton>

            <Typography style={{ flexGrow: 1 }}>SuperDedeVisi</Typography>

            <Button onClick={() => firebase.auth().signOut()}>Logout</Button>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.isDrawerOpen}
          onClose={this.closeDrawer}
          onOpen={this.openDrawer}
          anchor='left'>
          <List style={{ width: 250 }}>
            {menus
              .filter(menu => menu.role === this.props.userRole)
              .map(menu => (
                <ListItem
                  button
                  key={menu.name}
                  component='a'
                  href={menu.link}
                  onClick={this.closeDrawer}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              ))}
          </List>

          <Divider />

          <List>
            <ListItem button onClick={() => firebase.auth().signOut()}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </SwipeableDrawer>

        {this.props.userRole && (
          <MuiPickersUtilsProvider utils={DateFns}>
            <Switch>
              <Route path='/guru/upload'>
                <GuruDokumen />
              </Route>

              <Route path='/supervisor/dokumen'>
                <SuperDocs />
              </Route>

              <Route path='/kurikulum/supervisor'>Daftar Dokumen</Route>
              <Route path='/kurikulum/jadwal'>
                <Jadwal />
              </Route>

              <Route path='/kepsek/laporan'>Laporan Kepsek</Route>
            </Switch>
          </MuiPickersUtilsProvider>
        )}
      </>
    )
  }
}

export { HomePage }

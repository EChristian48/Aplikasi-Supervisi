import * as React from 'react'
import { List } from '@material-ui/core'

import { auth } from 'firebase/app'

import { Role } from '../dataSchema'
import { Switch, Route } from 'react-router-dom'
import { GuruDokumen } from './guru/GuruDokumen'

import DateFns from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SuperDocs } from './supervisor/SuperDocs'
import { Jadwal } from './kurikulum/Jadwal'
import { KepsekLapor } from './kepsek/KepsekLapor'
import { menus } from '../data/menus'
import { LoadingBanner } from '../components/LoadingBanner'
import { CustomAppBar } from '../components/CustomAppBar'
import { CustomDrawer } from '../components/CustomDrawer'
import { DrawerItem } from '../components/DrawerItem'
type HomePageState = {
  isDrawerOpen: boolean
  isHidden: boolean
}

type HomePageProps = {
  userRole: Role
}

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
  const [isAppBarShown, setAppBarShown] = React.useState(true)

  const closeDrawer = () => setDrawerOpen(false)
  const openDrawer = () => setDrawerOpen(true)

  const logout = () => auth().signOut()

  return (
    <>
      <LoadingBanner open={!userRole} />

      <CustomAppBar
        logout={logout}
        openDrawer={openDrawer}
        visible={isAppBarShown}
      />

      <CustomDrawer
        logout={logout}
        onClose={closeDrawer}
        onOpen={openDrawer}
        open={isDrawerOpen}>
        <List style={{ width: 250 }}>
          {menus
            .filter(menu => menu.role === userRole)
            .map(menu => (
              <DrawerItem
                icon={menu.icon}
                onClick={closeDrawer}
                href={menu.link}>
                {menu.name}
              </DrawerItem>
            ))}
        </List>
      </CustomDrawer>

      {userRole && (
        <MuiPickersUtilsProvider utils={DateFns}>
          <Switch>
            <Route path='/guru/upload'>
              <GuruDokumen />
            </Route>

            <Route path='/supervisor/dokumen'>
              <SuperDocs />
            </Route>

            <Route path='/kurikulum/jadwal'>
              <Jadwal />
            </Route>

            <Route path='/kepsek/laporan'>
              <KepsekLapor setAppBarShown={setAppBarShown} />
            </Route>
          </Switch>
        </MuiPickersUtilsProvider>
      )}
    </>
  )
}

export { HomePage }

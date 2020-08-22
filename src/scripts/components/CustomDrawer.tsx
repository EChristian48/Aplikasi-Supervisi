import * as React from 'react'
import { SwipeableDrawer, Divider, List } from '@material-ui/core'
import { DrawerItem } from './DrawerItem'
import { PowerSettingsNew } from '@material-ui/icons'

type CustomDrawerProps = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  logout: () => void | Promise<void>
}

const CustomDrawer: React.FC<CustomDrawerProps> = props => {
  return (
    <SwipeableDrawer
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      anchor='left'>
      {props.children}

      <Divider />

      <List>
        <DrawerItem icon={<PowerSettingsNew />} onClick={props.logout}>
          Logout
        </DrawerItem>
      </List>
    </SwipeableDrawer>
  )
}

export { CustomDrawer }

import * as React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

type MenuItemProps = {
  icon: JSX.Element
  onClick?: (event: React.MouseEvent) => void
  href?: string
}

const DrawerItem: React.FC<MenuItemProps> = ({
  icon,
  children,
  onClick,
  href,
}) => (
  <ListItem component='a' href={href} button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={children} />
  </ListItem>
)

export { DrawerItem }

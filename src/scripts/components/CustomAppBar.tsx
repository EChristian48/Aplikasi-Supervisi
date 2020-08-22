import * as React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useVisibilityClasses } from '../hooks/useVisibilityClasses'
import { useSpacingClasses } from '../hooks/useSpacingClasses'

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
)

type CustomAppBarProps = {
  visible: boolean
  openDrawer: () => void
  logout: () => void | Promise<void>
}

const CustomAppBar: React.FC<CustomAppBarProps> = props => {
  const classes = useStyles()
  const visiblityClasses = useVisibilityClasses()
  const spacingClasses = useSpacingClasses()

  return (
    <AppBar
      position='static'
      className={
        props.visible ? visiblityClasses.visible : visiblityClasses.hidden
      }>
      <Toolbar>
        <IconButton
          edge='start'
          onClick={props.openDrawer}
          className={spacingClasses.marginRight2}>
          <Menu />
        </IconButton>

        <Typography className={classes.title}>SuperDedeVisi</Typography>

        <Button onClick={props.logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export { CustomAppBar }

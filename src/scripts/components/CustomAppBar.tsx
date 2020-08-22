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

const useStyles = makeStyles(theme =>
  createStyles({
    marginRight2: {
      marginRight: theme.spacing(2),
    },
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
          className={classes.marginRight2}>
          <Menu />
        </IconButton>

        <Typography className={classes.title}>SuperDedeVisi</Typography>

        <Button onClick={props.logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export { CustomAppBar }

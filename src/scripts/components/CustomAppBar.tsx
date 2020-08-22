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

const useStyles = makeStyles(theme =>
  createStyles({
    visible: {
      visibility: 'visible',
    },
    hidden: {
      visibility: 'hidden',
    },
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

  return (
    <AppBar
      position='static'
      className={props.visible ? classes.visible : classes.hidden}>
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

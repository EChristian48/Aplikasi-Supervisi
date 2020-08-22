import { makeStyles, createStyles } from '@material-ui/core'

const useSpacingClasses = makeStyles(theme =>
  createStyles({
    marginRight2: {
      marginRight: theme.spacing(2),
    },
    marginBot2: {
      marginBottom: theme.spacing(2),
    },
    marginTop2: {
      marginTop: theme.spacing(2),
    },
    marginLeft2: {
      marginLeft: theme.spacing(2),
    },
  })
)

export { useSpacingClasses }

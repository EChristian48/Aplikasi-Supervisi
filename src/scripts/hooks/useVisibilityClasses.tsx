import { makeStyles, createStyles } from '@material-ui/core'

const useVisibilityClasses = makeStyles(theme =>
  createStyles({
    visible: {
      visibility: 'visible',
    },
    hidden: {
      visibility: 'hidden',
    },
  })
)

export { useVisibilityClasses }

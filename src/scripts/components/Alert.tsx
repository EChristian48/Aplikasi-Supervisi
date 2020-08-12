import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'

type AlertProps = {
  title: string
  open: boolean
  onClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined
}

const Alert: React.FC<AlertProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Gagal Login</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.children}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export { Alert }

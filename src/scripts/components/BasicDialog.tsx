import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'

type BasicDialogProps = {
  text?: string
  title: string
  open: boolean
  onClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined
}

const BasicDialog: React.FC<BasicDialogProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Gagal Login</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
        {props.children}
      </DialogContent>
    </Dialog>
  )
}

export { BasicDialog }

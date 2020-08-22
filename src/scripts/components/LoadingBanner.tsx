import * as React from 'react'

import { Backdrop, CircularProgress, BackdropProps } from '@material-ui/core'

const LoadingBanner: React.FC<BackdropProps> = props => {
  return (
    <Backdrop {...props}>
      <CircularProgress />
    </Backdrop>
  )
}

export { LoadingBanner }

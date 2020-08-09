import * as React from 'react'

import { LoggedInStatus } from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import { CircularProgress, Backdrop } from '@material-ui/core'
type NeedAuthProps = {
  user: LoggedInStatus
}

const NeedAuth: React.FC<NeedAuthProps> = props => {
  if (props.user !== 'loading') {
    if (props.user === null) {
      return <Redirect to='/login' />
    } else {
      return <>{props.children}</>
    }
  }

  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  )
}

export { NeedAuth }

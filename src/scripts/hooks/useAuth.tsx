import { useEffect, useState } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/auth'

type LoggedInStatus = firebase.User | null | 'loading'

const useAuth = () => {
  const [user, setUser] = useState<LoggedInStatus>('loading')

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  })

  return user
}

export { useAuth, LoggedInStatus }

import { useState } from 'react'
import { LoggedInStatus } from './useAuth'
import { User, Role } from '../dataSchema'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

const useUserRole = (user: LoggedInStatus) => {
  const [userRole, setUserRole] = useState<Role>()

  if (user !== 'loading' && user !== null) {
    const userDocRef = firebase.firestore().collection('users').doc(user.uid)
    userDocRef.get().then(doc => {
      setUserRole((doc.data() as User).role)
    })
  }

  return userRole
}

export { useUserRole }

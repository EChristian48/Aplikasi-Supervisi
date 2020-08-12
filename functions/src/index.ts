import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { User } from './dataSchema'

admin.initializeApp()

const createUserDocument = functions.auth.user().onCreate(user => {
  const userDocRef = admin.firestore().doc(`users/${user.uid}`)

  const userData: User = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  }

  userDocRef.create(userData)
})

export { createUserDocument }

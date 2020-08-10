import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

const createUserDocument = functions.auth.user().onCreate(user => {
  const userDocRef = admin.firestore().doc(`users/${user.uid}`)
  const userData = { ...user }

  return userDocRef.create(userData)
})

export { createUserDocument }

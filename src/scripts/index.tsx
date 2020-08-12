import '../styles/style.css'

import * as React from 'react'
import { render } from 'react-dom'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import { firebaseConfig } from './firebaseConfig'
import { App } from './App'

firebase.initializeApp(firebaseConfig)

// Check if we're in dev server
// If yes, use firebase emulator
if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
  })
  firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

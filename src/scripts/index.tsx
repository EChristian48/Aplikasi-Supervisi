import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { firebaseConfig } from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

import * as React from 'react'
import { render } from 'react-dom'

import { App } from './App'

import '../styles/style.css'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

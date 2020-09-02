import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from './firebaseConfig'

initializeApp(firebaseConfig)

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

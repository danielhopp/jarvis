import express from 'express'
import basicAuth from 'express-basic-auth'
import cors from 'cors'
import urlJoin from 'url-join'
import decamelize from 'decamelize'

import errorHandler from './errorHandler'
import * as routes from './routes/'

const {
  API_BASE = '/',
  PORT = 80,
  PASSWORD = null,
  WWW_DIR = null,
  CORS_WHITELIST = null
} = process.env

const app = express()

if (PASSWORD) {
  app.use(
    basicAuth({
      users: { demo: PASSWORD },
      challenge: true
    })
  )
}

app.use(express.json({ limit: '1mb' }))

if (CORS_WHITELIST) {
  app.use(cors(process.env.CORS_WHITELIST))
}

Object.entries(routes).map(([key, router]) =>
  app.use(urlJoin(API_BASE, decamelize(key, { separator: '-' })), router)
)

if (WWW_DIR) {
  app.use('/', express.static(WWW_DIR))
}

app.use(errorHandler)

app.listen(PORT, err => {
  if (err) {
    throw 'Error starting server'
  }
  console.log('Server listening on port', PORT)
})

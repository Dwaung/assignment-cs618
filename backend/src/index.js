import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'
import { app } from './app.js'

dotenv.config()

const allowedOrigins = [
  'https://blog-frontend-45606151135.us-east1.run.app',
  'http://localhost:5173',
  'http://localhost:3000'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Blocked by CORS policy'), false)
    }
    return callback(null, true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

const PORT = process.env.PORT || 3001

await initDatabase()

app.listen(PORT, () => {
  console.info(`express server running on http://localhost:${PORT}`)
})
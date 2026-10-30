import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())

app.use(cors({
    origin: [
        'https://blog-frontend-45606151135.us-east1.run.app', 
        'http://localhost:5173', 
        'https://opulent-sniffle-v6q6r5pr5vpqcpxrr-5173.app.github.dev'
    ],
    credentials: true
}))

postsRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }
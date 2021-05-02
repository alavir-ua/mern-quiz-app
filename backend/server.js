import path from 'path'
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import expressValidator from 'express-validator'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

dotenv.config()

import connectDB from './config/db.js'

connectDB()

import quizRoutes from './routes/quizRoutes.js'
import userRoutes from './routes/userRoutes.js'
import mailRoutes from './routes/mailRoutes.js'

app.use(express.json())
app.use(expressValidator())

app.use('/api/quizzes', quizRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sendmail', mailRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

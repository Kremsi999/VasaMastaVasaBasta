import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authentication.router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(express.json())

mongoose.connect(`${process.env.MONGO_URI as string}`)
const conn = mongoose.connection
conn.once('open', () => {
    console.log('DB ok')
})

const router = express.Router()
router.use('/auth', authRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`))

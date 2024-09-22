import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authentication.router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import appRouter from './routes/unregisteredRouter.router';
import ownerRouter from './routes/owner.router';
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(express.json())

mongoose.connect(`${process.env.MONGO_URI as string}`)
mongoose.set('strictPopulate', false);
const conn = mongoose.connection
conn.once('open', () => {
    console.log('DB ok')
})

const router = express.Router()
router.use('/auth', authRouter)
router.use('/app', appRouter)
router.use('/owner', ownerRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`))

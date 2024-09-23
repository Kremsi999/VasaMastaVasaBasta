import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authentication.router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import appRouter from './routes/unregisteredRouter.router';
import ownerRouter from './routes/owner.router';
import adminRouter from './routes/admin.router';
import decoratorRouter from './routes/decorator.router';
import decoratorController from './controllers/decorator.controller'
import cron from 'node-cron'
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
router.use('/admin', adminRouter)
router.use('/decorator', decoratorRouter)

cron.schedule('0 0 * * *', () => {
    console.log('Running blockDecoratorsWithoutPhoto cron job...');
    decoratorController.blockDecoratorsWithoutPhoto();
});

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`))

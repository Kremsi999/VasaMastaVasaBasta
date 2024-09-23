import express from 'express'
import multer from 'multer'
import Decorator from '../controllers/decorator.controller'

const decoratorRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

decoratorRouter.post('/profile', (req, res) => Decorator.getUserInfo(req, res))

decoratorRouter.put('/profile', upload.single('profilePicture'), (req, res) =>
    Decorator.updateUserInfo(req, res)
)

decoratorRouter.post('/getPendingJobs', (req, res) => Decorator.getPendingJobs(req, res))

decoratorRouter.post('/acceptJob', (req, res) => Decorator.acceptJob(req, res))

decoratorRouter.post('/rejectJob', (req, res) => Decorator.rejectJob(req, res))

decoratorRouter.post('/completeJob',  upload.single('photo'), (req, res) => Decorator.completeJob(req, res))

decoratorRouter.post('/confirmedJobsForDecorator', (req, res) => Decorator.confirmedJobsForDecorator(req, res))

export default decoratorRouter
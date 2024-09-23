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

decoratorRouter.post('/getPendingJobsForMaintenance', (req, res) => Decorator.getPendingJobsForMaintenance(req, res))

decoratorRouter.post('/acceptPendingJobsForMaintenance', (req, res) => Decorator.acceptPendingJobsForMaintenance(req, res))

decoratorRouter.post('/rejectPendingJobsForMaintenance', (req, res) => Decorator.rejectPendingJobsForMaintenance(req, res))

decoratorRouter.post('/numberOfJobsByMonthForDecorator', (req, res) => Decorator.numberOfJobsByMonthForDecorator(req, res))

decoratorRouter.post('/jobWeightBetweenDecorators', (req, res) => Decorator.jobWeightBetweenDecorators(req, res))

decoratorRouter.post('/averageDaysForJobByDecorator', (req, res) => Decorator.averageDaysForJobByDecorator(req, res))

export default decoratorRouter
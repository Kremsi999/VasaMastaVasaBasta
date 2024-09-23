import express from 'express'
import multer from 'multer'
import Owner from '../controllers/owner.controller'

const ownerRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

ownerRouter.post('/profile', (req, res) => Owner.getUserInfo(req, res))

ownerRouter.put('/profile', upload.single('profilePicture'), (req, res) =>
    Owner.updateUserInfo(req, res)
)

ownerRouter.post('/getFirms', (req, res) => Owner.getFirms(req, res))

ownerRouter.post('/getFirmDetails', (req, res) => Owner.getFirmDetails(req, res))

ownerRouter.post('/getAllActiveJobs', (req, res) => Owner.getCurrentJobs(req, res))

ownerRouter.post('/getAllArchivedJobs', (req, res) => Owner.getArchivedJobs(req, res))

ownerRouter.post('/addComment', (req, res) => Owner.addComment(req, res))

ownerRouter.post('/getComments', (req, res) => Owner.getComments(req, res))

ownerRouter.delete('/delete/:id', (req, res) => Owner.cancelJob(req, res))

export default ownerRouter
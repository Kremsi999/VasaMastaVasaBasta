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

export default ownerRouter
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

export default decoratorRouter
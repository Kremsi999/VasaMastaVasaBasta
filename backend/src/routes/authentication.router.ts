import express from 'express'
import multer from 'multer'
import Auth from '../controllers/authentication.controller'
import JWT from '../utils/jwt'

const authRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

authRouter.post('/register', upload.single('profilePicture'), (req, res) =>
    Auth.register(req, res)
)

authRouter.post('/login', (req, res) => Auth.login(req, res))

authRouter.post('/changePassword', (req, res) => Auth.changePassword(req, res))

authRouter.post('/refresh', (req, res) => JWT.refreshToken(req, res))

export default authRouter

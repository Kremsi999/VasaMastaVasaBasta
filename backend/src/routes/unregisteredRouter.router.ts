import express from 'express'
import Unregistered from '../controllers/unregisteredUser.controller'
const appRouter = express.Router()



appRouter.get('/dashboard-info', (req, res) => Unregistered.getDashboardInfo(req, res))

export default appRouter

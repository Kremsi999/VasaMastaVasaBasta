import express from 'express'
import AdminController from '../controllers/admin.controller'

const adminRouter = express.Router()



adminRouter.get('/users', (req, res) => AdminController.getUsers(req, res))

adminRouter.get('/firms', (req, res) => AdminController.getFirms(req, res))

adminRouter.put('/editUser', (req, res) => AdminController.editUser(req, res))

adminRouter.put('/acceptDenyUser', (req, res) => AdminController.acceptDenyUser(req, res))

adminRouter.post('/addFirm', (req, res) => AdminController.addFirm(req, res))

adminRouter.post('/addDecorator', (req, res) => AdminController.addDecorator(req, res))


export default adminRouter

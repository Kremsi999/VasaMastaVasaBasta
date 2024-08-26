'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const multer_1 = __importDefault(require('multer'))
const authentication_controller_1 = __importDefault(
    require('../controllers/authentication.controller')
)
const jwt_1 = __importDefault(require('../utils/jwt'))
const authRouter = express_1.default.Router()
const storage = multer_1.default.memoryStorage()
const upload = (0, multer_1.default)({ storage: storage })
authRouter.post('/register', upload.single('profilePicture'), (req, res) =>
    authentication_controller_1.default.register(req, res)
)
authRouter.post('/login', (req, res) =>
    authentication_controller_1.default.login(req, res)
)
authRouter.post('/changePassword', (req, res) =>
    authentication_controller_1.default.changePassword(req, res)
)
authRouter.post('/refresh', (req, res) => jwt_1.default.refreshToken(req, res))
exports.default = authRouter

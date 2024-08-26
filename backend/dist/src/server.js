'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const mongoose_1 = __importDefault(require('mongoose'))
const authentication_router_1 = __importDefault(
    require('../routes/authentication.router')
)
const cors_1 = __importDefault(require('cors'))
const user_1 = __importDefault(require('../models/user'))
const app = (0, express_1.default)()
app.use((0, cors_1.default)())
app.use(express_1.default.json())
mongoose_1.default.connect('mongodb://127.0.0.1:27017/PIAProject')
const conn = mongoose_1.default.connection
conn.once('open', () => {
    console.log('DB ok')
})
const router = express_1.default.Router()
router.use('/auth', authentication_router_1.default)
const register = () => {
    let user = new user_1.default({
        username: 'pera123',
        password: 'Pera123!',
        firstName: 'Petar',
        lastName: 'Petrović',
        gender: 'M',
        address: 'Neka Ulica 123, Beograd',
        phone: '+381601234567',
        email: 'pera@gmail.com',
        creditCardNumber: '4539123456789012',
        status: 'Vlasnik',
    })
    user.save()
        .then((ok) => {
            // res.json({"msg": "ok"})
        })
        .catch((err) => {
            console.log(err)
            // res.status(400).json({"msg": "error"})
        })
}
register()
app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`))

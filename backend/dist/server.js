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
    require('./routes/authentication.router')
)
const cors_1 = __importDefault(require('cors'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const app = (0, express_1.default)()
app.use(express_1.default.urlencoded({ extended: true }))
app.use((0, cookie_parser_1.default)())
app.use((0, cors_1.default)())
app.use(express_1.default.json())
mongoose_1.default.connect(`${process.env.MONGO_URI}`)
// mongoose.connect(`mongodb://localhost:27017/PIAProject`)
const conn = mongoose_1.default.connection
conn.once('open', () => {
    console.log('DB ok')
})
const router = express_1.default.Router()
router.use('/auth', authentication_router_1.default)
app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`))

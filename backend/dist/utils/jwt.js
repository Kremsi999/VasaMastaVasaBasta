'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const authenticateToken = (req, res, next) => {
    const accessToken = req.cookies['accessCookie']
    const refreshToken = req.cookies['refreshCookie']
    if (!accessToken && !refreshToken) return res.sendStatus(401)
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        return res
            .status(500)
            .send('Internal Server Error: Access token secret not defined')
    }
    try {
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET)
        next()
    } catch (error) {
        if (!refreshToken) {
            console.log(error)
            return res
                .status(401)
                .send('Access Denied. No refresh token provided.')
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(
                refreshToken,
                process.env.JWT_REFRESH
            )
            if (typeof decoded === 'object' && decoded.username) {
                const newAccessToken = generateToken(decoded.username)
                res.cookie('accessCookie', newAccessToken, {
                    maxAge: 900000,
                    httpOnly: true,
                })
                res.cookie('refreshCookie', refreshToken, {
                    maxAge: 9000000,
                    httpOnly: true,
                })
                next()
            } else {
                throw new Error('Invalid token payload')
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send('Invalid refresh token.')
        }
    }
}
const generateToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    })
}
const refreshToken = (req, res) => {
    const refreshToken = req.cookies['refreshCookie']
    if (!refreshToken) {
        return res.status(401).send('Refresh token not provided')
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(
            refreshToken,
            process.env.JWT_REFRESH
        )
        if (typeof decoded === 'object' && decoded.username) {
            const newAccessToken = generateToken(decoded.username)
            res.cookie('accessCookie', newAccessToken, {
                maxAge: 900000,
                httpOnly: true,
            })
            res.status(200).json({ accessToken: newAccessToken })
        } else {
            throw new Error('Invalid token payload')
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send('Invalid refresh token.')
    }
}
exports.default = { authenticateToken, refreshToken, generateToken }

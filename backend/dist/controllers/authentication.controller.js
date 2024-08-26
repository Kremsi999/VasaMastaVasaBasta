'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const user_1 = __importDefault(require('../models/user'))
const crypto_1 = require('../utils/crypto')
const regex_1 = require('../utils/regex')
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const register = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const {
                username,
                password,
                firstName,
                lastName,
                gender,
                address,
                phone,
                email,
                creditCardNumber,
                type,
            } = req.body
            let profilePictureData
            let profilePictureContentType
            if (req.file) {
                profilePictureData = req.file.buffer
                profilePictureContentType = req.file.mimetype
            }
            if (!regex_1.passwordRegex.test(password)) {
                res.status(406).send('Password is wrong format!')
                return
            }
            if (!regex_1.emailRegex.test(email)) {
                res.status(406).send('Email is wrong format!')
                return
            }
            if (
                !regex_1.dinersRegex.test(creditCardNumber) &&
                !regex_1.masterCardRegex.test(creditCardNumber) &&
                !regex_1.visaRegex.test(creditCardNumber)
            ) {
                res.status(406).send('Credit card is invalid!')
                return
            }
            if (yield user_1.default.findOne({ email })) {
                res.status(406).send('User already exists with this email!')
                return
            }
            if (yield user_1.default.findOne({ username })) {
                res.status(406).send('User already exists with this!')
                return
            }
            const newUser = new user_1.default({
                username,
                password: yield (0, crypto_1.hashPassword)(password),
                firstName,
                lastName,
                gender,
                address,
                phone,
                email,
                creditCardNumber,
                type,
                profilePicture: profilePictureData
                    ? {
                          data: profilePictureData,
                          contentType: profilePictureContentType,
                      }
                    : undefined,
                status: 'Pending',
            })
            yield newUser.save()
            res.status(201).send('User registered successfully!')
        } catch (error) {
            res.status(400).send('Error: ' + error)
        }
    })
const login = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body
            if (!regex_1.passwordRegex.test(password)) {
                res.status(406).send('Password is wrong format!')
                return
            }
            const user = yield user_1.default.findOne({ username: username })
            if (user) {
                const match = yield (0, crypto_1.comparePassword)(
                    password,
                    user.password
                )
                if (match) {
                    const accessToken = jsonwebtoken_1.default.sign(
                        { username },
                        process.env.JWT_SECRET
                    )
                    const refreshToken = jsonwebtoken_1.default.sign(
                        { username },
                        process.env.JWT_REFRESH
                    )
                    res.cookie('accessCookie', accessToken, {
                        maxAge: 900000,
                        httpOnly: true,
                    })
                    res.cookie('refreshCookie', refreshToken, {
                        maxAge: 900000,
                        httpOnly: true,
                    })
                    res.status(200).send('User logged in successfully!')
                } else {
                    res.status(406).send('Lozinka nije validna!')
                }
            } else {
                res.status(406).send(
                    'Ne postoji korisnik sa ovim kredencijalima!'
                )
            }
        } catch (error) {
            console.log(error)
            res.status(400).send('Error: ' + error)
        }
    })
const changePassword = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password, newPassword } = req.body
            if (!regex_1.passwordRegex.test(password)) {
                res.status(406).send('Password is wrong format!')
                return
            }
            if (!regex_1.passwordRegex.test(newPassword)) {
                res.status(406).send('New password is wrong format!')
                return
            }
            const user = yield user_1.default.findOne({ username: username })
            if (user) {
                const match = yield (0, crypto_1.comparePassword)(
                    password,
                    user.password
                )
                if (match) {
                    let newPass = yield (0, crypto_1.hashPassword)(newPassword)
                    yield user_1.default.updateOne(
                        { username: username },
                        { password: newPass }
                    )
                    res.status(200).send('Updated password successfully!')
                } else {
                    res.status(406).send('Lozinka nije validna!')
                }
            } else {
                res.status(406).send(
                    'Ne postoji korisnik sa ovim kredencijalima!'
                )
            }
        } catch (error) {
            console.log(error)
            res.status(400).send('Error: ' + error)
        }
    })
exports.default = {
    register,
    login,
    changePassword,
}

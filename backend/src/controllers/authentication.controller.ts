import { Request, Response } from 'express'
import UserModel from '../models/user'
import { comparePassword, hashPassword } from '../utils/crypto'
import {
    dinersRegex,
    emailRegex,
    masterCardRegex,
    passwordRegex,
    visaRegex,
} from '../utils/regex'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const register = async (req: Request, res: Response) => {
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
        let profilePictureData: Buffer | undefined
        let profilePictureContentType: string | undefined

        if (req.file) {
            profilePictureData = req.file.buffer
            profilePictureContentType = req.file.mimetype
        }

        if (!passwordRegex.test(password)) {
            res.status(406).send('Password is wrong format!')
            return
        }
        if (!emailRegex.test(email)) {
            res.status(406).send('Email is wrong format!')
            return
        }
        if (
            !dinersRegex.test(creditCardNumber) &&
            !masterCardRegex.test(creditCardNumber) &&
            !visaRegex.test(creditCardNumber)
        ) {
            res.status(406).send('Credit card is invalid!')
            return
        }
        if (await UserModel.findOne({ email })) {
            res.status(406).send('User already exists with this email!')
            return
        }
        if (await UserModel.findOne({ username })) {
            res.status(406).send('User already exists with this!')
            return
        }

        const newUser = new UserModel({
            username,
            password: await hashPassword(password),
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

        await newUser.save()

        res.status(201).send('User registered successfully!')
    } catch (error) {
        res.status(400).send('Error: ' + error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        if (!passwordRegex.test(password)) {
            res.status(406).send('Password is wrong format!')
            return
        }

        const user = await UserModel.findOne({ username: username })

        if (user) {
            const match = await comparePassword(password, user.password!)

            if (match) {
                const accessToken = jwt.sign(
                    { username },
                    process.env.JWT_SECRET as string
                )
                const refreshToken = jwt.sign(
                    { username },
                    process.env.JWT_REFRESH as string
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
            res.status(406).send('Ne postoji korisnik sa ovim kredencijalima!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Error: ' + error)
    }
}

const changePassword = async (req: Request, res: Response) => {
    try {
        const { username, password, newPassword } = req.body

        if (!passwordRegex.test(password)) {
            res.status(406).send('Password is wrong format!')
            return
        }

        if (!passwordRegex.test(newPassword)) {
            res.status(406).send('New password is wrong format!')
            return
        }

        const user = await UserModel.findOne({ username: username })

        if (user) {
            const match = await comparePassword(password, user.password!)

            if (match) {
                const newPass = await hashPassword(newPassword)
                await UserModel.updateOne(
                    { username: username },
                    { password: newPass }
                )
                res.status(200).send('Updated password successfully!')
            } else {
                res.status(406).send('Lozinka nije validna!')
            }
        } else {
            res.status(406).send('Ne postoji korisnik sa ovim kredencijalima!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Error: ' + error)
    }
}

export default {
    register,
    login,
    changePassword,
}

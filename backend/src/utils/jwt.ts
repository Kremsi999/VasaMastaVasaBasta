import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
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
        jwt.verify(accessToken, process.env.JWT_SECRET as string)
        next()
    } catch (error) {
        if (!refreshToken) {
            console.log(error)
            return res
                .status(401)
                .send('Access Denied. No refresh token provided.')
        }

        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH as string
            ) as jwt.JwtPayload

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

const generateToken = (username: string): string => {
    return jwt.sign({ username }, process.env.JWT_SECRET as string, {
        expiresIn: '15m',
    })
}

const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshCookie']

    if (!refreshToken) {
        return res.status(401).send('Refresh token not provided')
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH as string
        ) as jwt.JwtPayload

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

export default { authenticateToken, refreshToken, generateToken }

import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = (authHeader as string).split(' ')[1]
        if (!token) {
            res.status(401)
            res.json('No token provided')
            return
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        if (!decoded) {
            res.status(401)
            res.json('Authentication failed')
            return
        }
        next()
    } catch (error) {
        res.status(401)
        res.json('Authentication failed')
    }
}

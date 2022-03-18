import { Request, Response } from "express"
import jwt from 'jsonwebtoken'


const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const token = req.headers.authorization as string
        if(!token)
            res.send("You are not auth to take this action")
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) { 
        res.status(401)
    }
}
export {verifyAuthToken}
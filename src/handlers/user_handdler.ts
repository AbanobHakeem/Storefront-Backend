import express, { Request, Response } from 'express'
import { User,UserStore } from '../models/User'
import { verifyAuthToken } from '../middlewares/authverfiy'
import jwt from 'jsonwebtoken'

const users = new UserStore()

const index = async (_req: Request, res: Response) => {
  const Users = await users.index()
  res.json(Users)
}

const show = async (req: Request, res: Response) => {
   const User = await users.show(req.params.id)
   res.json(User)
}

const create = async (req: Request, res: Response) => {
    try {
        const User: User = {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password_digest :req.body.password_digest
        }
        const newUser = await users.create(User)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}


const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id:req.params.id,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password_digest :req.body.password_digest
        }
        const newUser = await users.update(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}



const destroy = async (req: Request, res: Response) => {
    const deleted = await users.delete(req.body.id)
    res.json(deleted)
}

const auth = async (req: Request, res: Response) => {
    const user = await users.authenticate(req.body.username as string,req.body.password as string)
    var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token)
}


const UserRoutes = (app: express.Application) => {
  app.get('/users',verifyAuthToken,index)
  app.get('/users/:id',verifyAuthToken, show)
  app.post('/users', create)
  app.delete('/users',verifyAuthToken, destroy)
  app.put('/users/:id',verifyAuthToken,update)
  app.post('/users/auth',auth)
}

export default UserRoutes
;
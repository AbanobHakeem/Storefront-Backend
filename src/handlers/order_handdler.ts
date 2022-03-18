import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authverfiy'
import jwt from 'jsonwebtoken'
import { Order,OrderStore } from '../models/Order'
import { User, UserStore } from '../models/User'
const orders = new OrderStore()
const users = new UserStore()


const index = async (_req: Request, res: Response) => {
  const Orders = await orders.index()
  res.json(Orders)
}

const show = async (req: Request, res: Response) => {
   const Order = await orders.show(req.params.id)
   res.json(Order)
}

const create = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as {user:User,iat:number}
        const user_id=decoded.user.id as string;
        const Cate: Order = {
            status:"active",
            user_id:user_id
        }
        const newOrder = await orders.create(Cate)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}


const update = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as {user:User,iat:number}
        const user_id=decoded.user.id as string;
        const order: Order = {
            id:req.params.id,
            status:req.body.status,
            user_id:user_id
        }
        const newOrder = await orders.update(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}



const destroy = async (req: Request, res: Response) => {
    const deleted = await orders.delete(req.body.id)
    res.json(deleted)
}

const current = async (req: Request, res: Response) => {
    const order = await orders.current(req.params.user_id)
    res.json(order)
}
const complete = async (req: Request, res: Response) => {
    const order = await orders.complete(req.params.id,req.params.user_id)
    res.json(order)
}


const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)
  
    try {
      const addedProduct = await orders.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  }


const OrderRoutes = (app: express.Application) => {
  app.get('/orders',verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken,show)
  app.get('/orders/current/:user_id/user', verifyAuthToken,current)
  app.patch('/orders/:id/complete/:user_id/user', verifyAuthToken,complete)
  app.post('/orders',verifyAuthToken, create)
  app.delete('/orders',verifyAuthToken, destroy)
  app.put('/orders/:id',verifyAuthToken,update)
  app.post('/orders/:id/products', addProduct)
}

export default OrderRoutes;



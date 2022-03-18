import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authverfiy'
import { Category, CategoryStore } from '../models/Category'


const store = new CategoryStore()

const index = async (_req: Request, res: Response) => {
  const Categorys = await store.index()
  res.json(Categorys)
}

const show = async (req: Request, res: Response) => {
   const Category = await store.show(req.params.id)
   res.json(Category)
}

const create = async (req: Request, res: Response) => {
    try {
        const Cate: Category = {
            name:req.body.name
        }
        const newCategory = await store.create(Cate)
        res.json(newCategory)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}


const update = async (req: Request, res: Response) => {
    try {
        const Cate: Category = {
            id:req.params.id,
            name:req.body.name
        }
        const newCategory = await store.update(Cate)
        res.json(newCategory)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}



const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const CategoryRoutes = (app: express.Application) => {
  app.get('/categories', index)
  app.get('/categories/:id', show)
  app.post('/categories', create)
  app.delete('/categories', destroy)
  app.put('/categories/:id',update)
}

export default CategoryRoutes
;
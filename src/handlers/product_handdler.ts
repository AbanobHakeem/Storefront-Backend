import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middlewares/authverfiy'
import { Product,ProductStore } from '../models/Product'
const products = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const Products = await products.index()
  res.json(Products)
}

const show = async (req: Request, res: Response) => {
   const Product = await products.show(req.params.id)
   res.json(Product)
}

const create = async (req: Request, res: Response) => {
    try {
        const Cate: Product = {
            name:req.body.name,
            price:req.body.price,
            category_id:req.body.category_id
        }
        const newProduct = await products.create(Cate)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}


const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id:req.params.id,
            name:req.body.name,
            price:req.body.price,
            category_id:req.body.category_id
        }
        const newProduct = await products.update(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    } 
}



const destroy = async (req: Request, res: Response) => {
    const deleted = await products.delete(req.body.id)
    res.json(deleted)
}

const getByCategory = async (req: Request, res: Response) => {
    const productsres = await products.getByCategory(req.params.category_id)
    res.json(productsres)
}
const popular = async (req: Request, res: Response) => {
    const productsres = await products.popular()
    res.json(productsres)
}

const ProductRoutes = (app: express.Application) => {
    app.get('/products/popular', popular)
    app.get('/products', index)
  app.get('/products/:id', show)
  app.get('/products/:category_id/category', getByCategory)
  app.post('/products',verifyAuthToken, create)
  app.delete('/products',verifyAuthToken, destroy)
  app.put('/products/:id',verifyAuthToken,update)
}

export default ProductRoutes;
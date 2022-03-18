import database from "../database"
import { Product } from "./Product"

export type Order = {
    id? :string,
    status :string,
    user_id :string,
}


export class OrderStore {
  
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(order: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn
        .query(sql, [order.status,order.user_id])

    const orderres = result.rows[0]

    conn.release()

    return orderres
      } catch (err) {
          throw new Error(`Could not add new order . Error: ${err}`)
      }
  }

  async update(order: Order): Promise<Order> {
    
    try {
  const sql = `UPDATE orders
                SET status = $1 , user_id=$2 
                WHERE id = ${order.id}
                RETURNING *`
  // @ts-ignore
  const conn = await database.connect()

  const result = await conn
      .query(sql, [order.status,order.user_id])

  const orderres = result.rows[0]

  conn.release()

  return orderres
    } catch (err) {
        throw new Error(`Could not update. Error: ${err}`)
    }
}

  async delete(id: string): Promise<Order> {
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete orders ${id}. Error: ${err}`)
      }
  }


  async current(user_id: string): Promise<Product[]> {
    
    try {
    const sql = 
    `SELECT P.id,P.name,P.price,OP.quantity  
    FROM orders as O 
    join order_products as OP on O.id = OP.order_id 
    join products as P on OP.product_id = P.id 
    where O.status='active' and O.user_id = ($1);
    `
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [user_id])

    conn.release()

    return result.rows;
    } catch (err) {
        throw new Error(`Could not find order for user current. Error: ${err}`)
    }
  }

  async complete(id:string,user_id: string): Promise<Order> {
    
    try {
      const sql = `UPDATE orders
      SET status = 'complete'
      WHERE user_id =${user_id} and id=${id}
      RETURNING *`
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql)

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order for user current. Error: ${err}`)
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {

    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignore
      const conn = await database.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status == "complete") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }

    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await database.connect()

      const result = await conn
          .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}
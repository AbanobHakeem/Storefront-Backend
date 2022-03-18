import database from "../database"

export type Product = {
    id? :string,
    name :string,
    price :number,
    category_id :string
}

export class ProductStore {
  async popular(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 
      `select OP.product_id as id ,P.name ,P.price,p.category_id, sum(OP.quantity)as sales  from order_products as OP 
      join products as P on OP.product_id = P.id 
      Group by OP.product_id,P.name,P.price,P.category_id 
      order by sales desc 
      limit 5;`

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }
  async getByCategory(category_id: string) {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM products WHERE category_id = $1'
      const result = await conn.query(sql,[category_id])
      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(product: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO products (name,price,category_id) VALUES($1,$2,$3) RETURNING *'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn
        .query(sql, [product.name,product.price,product.category_id])

    const productres = result.rows[0]

    conn.release()

    return productres
      } catch (err) {
          throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
      }
  }

  async update(product: Product): Promise<Product> {
    
    try {
  const sql = `UPDATE products
                SET name = $1 , price=$2 ,category_id=$3
                WHERE id = ${product.id}
                RETURNING *`
  // @ts-ignore
  const conn = await database.connect()

  const result = await conn
      .query(sql, [product.name,product.price,product.category_id])

  const productres = result.rows[0]

  conn.release()

  return productres
    } catch (err) {
        throw new Error(`Could not update ${product.name}. Error: ${err}`)
    }
}

  async delete(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete products ${id}. Error: ${err}`)
      }
  }
}
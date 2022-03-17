import database from "../database";

export type User = {
    fullname: string;
    email: string
 
}

export class UserStore {
 async index(): Promise<User[]> {
   try {
     
     const conn = await database.connect()
     const sql = 'SELECT * FROM Users'

     const result = await conn.query(sql)

     conn.release()

     return result.rows 
   } catch (err) {
     throw new Error(`Could not get Users. Error: ${err}`)
   }
 }

 async show(id: string): Promise<User> {
   try {
   const sql = 'SELECT * FROM Users WHERE id=($1)'
   // @ts-ignore
   const conn = await database.connect()

   const result = await conn.query(sql, [id])

   conn.release()

   return result.rows[0]
   } catch (err) {
       throw new Error(`Could not find User ${id}. Error: ${err}`)
   }
 }

 async create(user: User): Promise<User> {
     try {
   const sql = 'INSERT INTO Users (fullname , email) VALUES($1, $2) RETURNING *'
  
   const conn = await database.connect()

   const result = await conn
       .query(sql, [user.fullname, user.email])

   const User = result.rows[0]

   conn.release()

   return User
     } catch (err) {
         throw new Error(`Could not add new User ${user.fullname}. Error: ${err}`)
     }
 }

 async delete(id: string): Promise<User> {
     try {
   const sql = 'DELETE FROM Users WHERE id=($1)'
   
   const conn = await database.connect()

   const result = await conn.query(sql, [id])

   const User = result.rows[0]

   conn.release()

   return User
     } catch (err) {
         throw new Error(`Could not delete User ${id}. Error: ${err}`)
     }
 }
}
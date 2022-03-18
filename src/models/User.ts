import database from "../database"
import bcrypt from 'bcrypt'

export type User = {
    id? :string,
    firstname :string,
    lastname :string,
    username :string,
    password_digest :string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await database.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find users ${id}. Error: ${err}`)
    }
  }
  async getByUsername(username: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE username=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [username])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find users ${username}. Error: ${err}`)
    }
  }

  async create(user: User): Promise<User> {
   
      try {
        const {
          BCRYPT_PASSWORD,
          SALT_ROUNDS
      } = process.env 

      const hash = bcrypt.hashSync(
        user.password_digest + BCRYPT_PASSWORD, 
        parseInt(SALT_ROUNDS as string)
      );

    const sql = 'INSERT INTO users (firstname,lastname,username,password_digest) VALUES($1,$2,$3,$4) RETURNING *'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn
        .query(sql, [user.firstname,user.lastname,user.username,hash])

    const users = result.rows[0]

    conn.release()

    return users
      } catch (err) {
          throw new Error(`Could not add new product ${user.firstname}. Error: ${err}`)
      }
  }

  async update(user: User): Promise<User> {
    
    try {

      const {
        BCRYPT_PASSWORD,
        SALT_ROUNDS
    } = process.env 

    const hash = bcrypt.hashSync(
      user.password_digest + BCRYPT_PASSWORD, 
      parseInt(SALT_ROUNDS as string)
    );

  const sql = `UPDATE users
                SET firstname=$1,lastname=$2,username=$3,password_digest=$4
                WHERE id = ${user.id}
                RETURNING *`
  // @ts-ignore
  const conn = await database.connect()

  const result = await conn
      .query(sql, [user.firstname,user.lastname,user.username,hash])

  const users = result.rows[0]

  conn.release()

  return users
    } catch (err) {
        throw new Error(`Could not update ${user.firstname}. Error: ${err}`)
    }
}

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await database.connect()

    const result = await conn.query(sql, [id])

    const users = result.rows[0]

    conn.release()

    return users
      } catch (err) {
          throw new Error(`Could not delete users ${id}. Error: ${err}`)
      }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await database.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await conn.query(sql, [username])

    const {
      BCRYPT_PASSWORD,
  } = process.env 

    if(result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password_digest)) {
        return user
      }
    }

    return null
  }

}
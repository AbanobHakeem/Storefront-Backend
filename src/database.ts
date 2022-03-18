import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
let database

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    POSTGRES_USER_TEST,
    POSTGRES_PASSWORD_TEST,
    ENV
} = process.env 

if(ENV === 'test') {
    database = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB_TEST,
      user: POSTGRES_USER_TEST,
      password: POSTGRES_PASSWORD_TEST,
    })
  }
  
  if(ENV === 'dev') {
    database = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }

export default database 
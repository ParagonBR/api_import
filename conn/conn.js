import mariadb from 'mariadb'
import env from 'dotenv'

env.config()

export default function  pool(){
  
  return mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'BO_Ativo',
    idleTimeout : 10,
    connectionLimit: 5 
  });
}

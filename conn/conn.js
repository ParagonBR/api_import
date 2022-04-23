import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: '10.0.150.9',
    user: 'root',
    password: 'michele1',
    database: 'BO_Ativo',
    idleTimeout : 10
  });
export default pool
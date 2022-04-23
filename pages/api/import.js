import pool from '../../conn/conn'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const cors = initMiddleware(
    Cors({
      methods: ['GET','POST'],
    })
)
export default async function handler(req, res) {
    try {
        console.log(req.body)
        await cors(req, res)
        const conn = await pool.getConnection()
        let resposta = await conn.query("select * from tb_usuarios where matricula = ?",
        [req.body.matricula])
        await conn.end();
        res.status(200).json(resposta)
    } catch (error) {
        console.error(error)
    }

}
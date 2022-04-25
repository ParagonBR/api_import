import pool from '../conn/conn'

export default async function json_to_db(json,consulta) {
    try {
        let linhas = 0
        for (let param of json) {
            const conn = await pool.getConnection()
            try {
                let resposta = await conn.query(consulta, Object.values(param))
                await conn.end()
                if (conn) await conn.release()
                linhas = linhas + resposta.affectedRows
            } catch (error) {
                await conn.end()
                if (conn) await conn.release()
                console.log(error) 
            }
        }
        return linhas
    } catch (error) {
        console.trace(error)
    }
}
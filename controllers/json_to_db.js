import Pool from '../conn/conn'

const pool = Pool()

export default async function json_to_db(json, consulta) {
    const conn = await pool.getConnection()
    try {
        let linhas = 0

        for (let param of json) {
            try {
                let resposta = await conn.query(consulta, Object.values(param))
                await conn.end()
                if (conn) await conn.release()
                linhas = linhas + resposta.affectedRows
            } catch (error) {
                await conn.end()
                if (conn) await conn.release()
                throw error.text
            } finally {
                if (conn){
                    await conn.release()
                    await conn.end()
                }           
            }
        }
        return linhas
    } catch (error) {
        if (conn){
            await conn.release()
            await conn.end()
        } 
        throw error
    }
}
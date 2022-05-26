import json_to_xlsx from '../../controllers/json_to_xlsx'
import * as fs from 'fs'
import initMiddleware from '../../lib/init-middleware'
import Cors from 'cors'

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST'],
    })
)
export default async function handler(req, res) {
    await cors(req, res)
    console.log(req.body)

    let {nome_arquivo, caminho_arquivo } = await json_to_xlsx(req.body)
    res.setHeader(
        "Content-Disposition",
        "attachment; filename="+nome_arquivo
    );
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    const download_arquivo = fs.readFileSync(caminho_arquivo)
    res.send(download_arquivo)
    try {
        fs.unlinkSync(caminho_arquivo)
    } catch (err) {
        console.error(err)
    }
}
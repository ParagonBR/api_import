import pool from '../../conn/conn'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import handle_xlsx from '../../controllers/handle_xlsx'
import middleware from '../../lib/middleware'
import nextConnect from 'next-connect'


const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST'],
    })
)
const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
    await cors(req, res)
    console.log(req.body)
    console.log(req.files)

    try {
        console.log(JSON.stringify(req.body))
        await cors(req, res)
        let resposta = await handle_xlsx(req.files.arquivo[0].path)
        res.status(200).json(JSON.stringify(resposta))
    } catch (error) {
        console.error(error)
    }

})

export const config = {
    api: {
        bodyParser: false
    }
}
export default handler


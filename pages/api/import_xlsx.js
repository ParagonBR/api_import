import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import handle_xlsx from '../../controllers/handle_xlsx'
import middleware from '../../lib/middleware'
import nextConnect from 'next-connect'
import json_to_db from '../../controllers/json_to_db'


const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST'],
    })
)
const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
    try {
        await cors(req, res)
        let resposta = await handle_xlsx(req.files.arquivo[0].path)
        resposta.forEach(param => {
            param['DATA SOLICITAÇÃO'] = ExcelDateToDB(param['DATA SOLICITAÇÃO'])
            if (!param['NOME DO CLIENTE']) {
                param['NOME DO CLIENTE'] = '-'
            }
            if (!param['CPF/CNPJ']) {
                param['CPF/CNPJ'] = '-'
            }
            if (!param['TELEFONE']) {
                param['TELEFONE'] = '-'
            }
            if (!param['PRODUTO']) {
                param['PRODUTO'] = '-'
            }
            if (!param['ENDEREÇO EMAIL CORRIGIDO']) {
                param['ENDEREÇO EMAIL CORRIGIDO'] = '-'
            }
        })
        const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
        resposta = resposta.map(param => sortObject(param))
        console.log(resposta.filter(param=>Object.values(param).length === 7).length)
        if(resposta.filter(param=>Object.values(param).length === 7).length != resposta.length){
            throw "Arquivo XLSX Inválido"
        }
        else{
            let cont = await json_to_db(resposta,`insert into tb_mailing_email (cpf_cnpj,
                custcode,
                data_solicatao,
                email,
                nome_cliente,
                status_cliente,
                gsm) values (?, ?, ?, ?, ?, ?, ?)`)
            res.status(200).json(cont +  " Linhas Importadas")
        }
    } catch (erro) {
        res.status(200).send(erro)
        console.error(erro)
    }

})


let ExcelDateToDB = function (param) {
    let data = new Date(((param - 25569) * 86400) * 1000 + 10800000)
    return data.toJSON().slice(0, 10)
}

export const config = {
    api: {
        bodyParser: false
    }
}
export default handler


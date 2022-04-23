import XLSX from 'xlsx'


export default async function handle_xlsx(arquivo)
{
    var conteudo;
    var workbook = XLSX.readFile(arquivo);
        console.log(workbook);
        let planilha = workbook.SheetNames[0]
        console.log(planilha);
        conteudo = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[planilha]);
        conteudo.forEach(param => {
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
        conteudo = conteudo.map(param => sortObject(param))
    return conteudo
}

let ExcelDateToDB = function (param) {
    let data = new Date(((param - 25569) * 86400) * 1000 + 10800000)
    return data.toJSON().slice(0, 10)
}
import XLSX from 'xlsx'
import * as fs from 'fs'

export default async function handle_xlsx(arquivo) {
    var conteudo;
    var workbook = XLSX.readFile(arquivo);
    let planilha = workbook.SheetNames[0]
    conteudo = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[planilha]);
    try {
        fs.unlinkSync(arquivo)
        //apagou
    } catch (err) {
        console.error(err)
    }
    return conteudo
}
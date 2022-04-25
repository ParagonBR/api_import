import XLSX from 'xlsx'


export default async function handle_xlsx(arquivo)
{
    var conteudo;
    var workbook = XLSX.readFile(arquivo);
        let planilha = workbook.SheetNames[0]
        conteudo = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[planilha]);
    return conteudo
}


import XLSX from 'xlsx'

export default async function json_to_xlsx(json) {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "planilha");
    let nome_arquivo = "Teste.xlsx"
    let caminho_arquivo = `./uploads/${nome_arquivo}`
    XLSX.writeFile(workbook, caminho_arquivo)
    return {nome_arquivo,caminho_arquivo}
}
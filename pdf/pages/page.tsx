import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Content, ContentColumns, ContentStack } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function createHeader(): ContentColumns {
    return {
        columns: [
            {
                text: {
                    text: 'ERG-AEP-COLORADO-0001-23', // Wrap the string in an object
                },
                alignment: 'right',
                margin: [0, 10, 0, 0]
            }
        ],
        margin: [40, 40, 40, 0]
    };
}
function createFooter(currentPage: number, pageCount: number): ContentStack {
    return {
        stack: [
            { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right' },
            { text: '\n\nERGOGROUP SEGURANÇA DO TRABALHO LTDA.\nRua Santo Antônio, 145 – Centro – Uberaba/ MG\n(34) 3333-9987 / contato@ergogroup.com.br', alignment: 'center' }
        ],
        margin: [40, 0]
    };
}

function generatePDFContent(): Content[] {
    const content: Content[] = [];

    for (let i = 1; i <= 12; i++) {
        const pageContent: Content = {
            columns: [
                createHeader(),
                { text: `Conteúdo da página ${i}`, fontSize: 16, bold: true, margin: [40, 40, 0, 0] }
            ],
            margin: [0, 10, 0, 0]
        };
        content.push(pageContent);
    }

    return content;
}

export async function generatePDF() {
    const docDefinition: TDocumentDefinitions = {
        content: generatePDFContent(),
        defaultStyle: { font: 'Helvetica' }
    };

    pdfMake.createPdf(docDefinition).download('documento.pdf');
}

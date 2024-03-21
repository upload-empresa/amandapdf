import { createInstance, TDocumentDefinitions } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const pdfMake = createInstance(pdfFonts);

function createHeader() {
    return {
        columns: [
            {
                image: 'left_image.png',
                width: 100,
                alignment: 'left'
            },
            {
                text: 'ERG-AEP-COLORADO-0001-23',
                alignment: 'right',
                margin: [0, 10, 0, 0]
            }
        ],
        margin: [40, 40, 40, 0]
    };
}

function createFooter(currentPage: number, pageCount: number) {
    return {
        text: [
            { text: Página ${ currentPage } de ${ pageCount }, alignment: 'right' },
        { text: '\n\nERGOGROUP SEGURANÇA DO TRABALHO LTDA.\nRua Santo Antônio, 145 – Centro – Uberaba/ MG\n(34) 3333-9987 / contato@ergogroup.com.br', alignment: 'center' }
    ],
    margin: [40, 0]
};
}

function generatePDFContent() {
    const content: TDocumentDefinitions[] = [];

    for (let i = 1; i <= 12; i++) {
        const pageContent: TDocumentDefinitions = {
            content: [
                createHeader(),
                { text: Conteúdo da página ${ i }, fontSize: 16, bold: true, margin: [40, 40, 0, 0] },
            {
                columns: [
                    { width: '*', text: '' },
                    {
                        width: 'auto',
                        stack: [
                            { text: 'Avaliação Ergonômica Preliminar – AEP', fontSize: 10 },
                            { text: 'Revisão 00 (14/03/2023)', fontSize: 10 }
                        ]
                    }
                ],
                margin: [0, 10, 40, 0],
                alignment: 'right'
        }
      ],
        pageSize: 'A4',
            footer: (currentPage: number, pageCount: number) => createFooter(currentPage, pageCount)
    };
    content.push(pageContent);
}

for (let i = 13; i <= 27; i++) {
    const pageContent: TDocumentDefinitions = {
        content: [
            createHeader(),
            { text: Conteúdo da página ${ i }, fontSize: 16, bold: true, margin: [40, 40, 0, 0] },
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    stack: [
                        { text: 'Avaliação Ergonômica Preliminar – AEP', fontSize: 10 },
                        { text: 'Revisão 00 (14/03/2023)', fontSize: 10 }
                    ]
                }
            ],
            margin: [0, 10, 40, 0],
            alignment: 'right'
        }
      ],
    pageSize: { width: 842, height: 595 },
    footer: (currentPage: number, pageCount: number) => createFooter(currentPage, pageCount)
};
content.push(pageContent);
  }

for (let i = 28; i <= 31; i++) {
    const pageContent: TDocumentDefinitions = {
        content: [
            createHeader(),
            { text: Conteúdo da página ${ i }, fontSize: 16, bold: true, margin: [40, 40, 0, 0] },
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    stack: [
                        { text: 'Avaliação Ergonômica Preliminar – AEP', fontSize: 10 },
                        { text: 'Revisão 00 (14/03/2023)', fontSize: 10 }
                    ]
                }
            ],
            margin: [0, 10, 40, 0],
            alignment: 'right'
        }
      ],
    pageSize: 'A4',
        footer: (currentPage: number, pageCount: number) => createFooter(currentPage, pageCount)
};
content.push(pageContent);
  }

return content;
}

async function generatePDF() {
    const docDefinition = {
        content: generatePDFContent(),
        defaultStyle: { font: 'Helvetica' }
    };

    pdfMake.createPdf(docDefinition).download('documento.pdf');
}

generatePDF();
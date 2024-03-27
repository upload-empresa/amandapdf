import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
// import { TDocumentDefinitions, Content, ContentColumns, ContentStack } from 'pdfmake/interfaces';

function clientesPDF(clientes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Clientes',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left, top, right, bottom
        }
    ];

    const dados = clientes.map((cliente) => {
        return [
            { text: cliente.id, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.email, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.fone, fontSize: 9, margin: [0, 2, 0, 2] }
        ]
    });
    // columns: [
    //     {
    //         text: {
    //             text: 'ERG-AEP-COLORADO-0001-23', // Wrap the string in an object
    //         },
    //         alignment: 'right',
    //         margin: [0, 10, 0, 0]
    //     }
    // ],
    // margin: [40, 40, 40, 0]

    const details = [
        {
            alignment: 'right',
            margin: [0, 10, 0, 0],
            columns: [
                {
                    text: 'iba'
                },
                // {
                //     text: 'Lorem ipsum dolor.'
                // }
            ]
        },

    ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ]
    }

    const Header = [
        {
            alignment: 'left',
            fontSize: 9,
            margin: [10, 10, 0, 0],
            columns: [
                {
                    text: 'ERG-AEP-COLORADO-0001-23',
                },
                // {
                //     image: '/public/pdf1.png',
                //     width: 150
                // },
                // {
                //     text: 'Avaliação Ergonômica Preliminar – AEP'
                // }

            ]
        },
        {
            alignment: 'right',
            fontSize: 9,
            columns: [
                {
                    text: 'Avaliação Ergonômica Preliminar – AEP',
                },
                // {
                //     image: '/public/pdf1.png',
                //     width: 150
                // },
                // {
                //     text: 'Avaliação Ergonômica Preliminar – AEP'
                // }

            ]
        },
    ]



    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [Header],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).download();
}

export default clientesPDF;
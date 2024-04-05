import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function clientesPDF(clientes) {
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
            { text: cliente.id.toString(), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.email, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: cliente.fone, fontSize: 9, margin: [0, 2, 0, 2] }
        ];
    });

    const details = {
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
                [
                    { text: 'Código', style: 'tableHeader', fontSize: 10 },
                    { text: 'Nome', style: 'tableHeader', fontSize: 10 },
                    { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
                    { text: 'Telefone', style: 'tableHeader', fontSize: 10 }
                ],
                ...dados
            ]
        },
        layout: 'lightHorizontalLines' // headerLineOnly
    };

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ];
    }

    const content = [];

    for (let i = 0; i < 31; i++) { // Loop 31 vezes para adicionar 31 páginas
        if (i === 1) { // Na segunda página
            content.push({ text: 'TODOS OS DIREITOS RESERVADOS: Proibida a reprodução total ou parcial, por qualquer meio ou processo, especialmente por sistemas gráficos, microfílmicos, fotográficos, reprográficos e videográficos. Vedada a memorização e/ou a recuperação total ou parcial, bem como a inclusão de qualquer parte deste material em qualquer sistema de processamento de dados. A violação dos direitos autorais é punível como crime (art. 184 do Código Penal), com pena de prisão e multa, busca e apreensão e indenizações diversas (arts. 101 a 110 da Lei nº 9.610/98).', fontSize: 12 });
        } else {
            content.push(details);
        }
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: reportTitle,
        content: content,
        footer: Rodape
    };

    pdfMake.createPdf(docDefinition).download();
}

export default clientesPDF;

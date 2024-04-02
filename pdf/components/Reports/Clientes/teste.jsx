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

    const details =
        [
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                color: '#000',
                fontSize: 28,
                bold: true,
                text: 'AVALIAÇÃO ERGONÔMICA PRELIMINAR – AEP ',
                alignment: 'center'
            },
            {
                text: '\n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                color: '#000',
                fontSize: 16,
                bold: true,
                text: 'NORMA REGULAMENTADORA NR 17',
                alignment: 'right'
            },
            {
                text: '\n'
            },
            {
                widths: 70,
                margin: [40, 0, 40, 0],
                color: '#000',
                fontSize: 10,
                text: 'Portaria MTP n°423, de 7 de OUTUBRO de 2021.',
                alignment: 'right'
            },
            {
                text: '\n \n \n \n \n \n '
            },

            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                color: '#000',
                fontSize: 10,
                text: 'TODOS  OS  DIREITOS  RESERVADOS:  Proibida  a  reprodução  total  ou  parcial,  por qualquer  meio  ou  processo,  especialmente  por  sistemas  gráficos,  microfílmicos, fotográficos, reprográficos e videográficos. Vedada a memorização e/ou a recuperação total  ou  parcial,  bem  como  a  inclusão  de  qualquer  parte  deste  material  em  qualquer sistema  de  processamento  de  dados.  A violação  dos  direitos  autorais  é punível  como crime  (art.  184  do  Código  Penal),  com  pena  de  prisão  e  multa,  busca  e  apreensão  e indenizações diversas (arts. 101 a 110 da Lei nº 9.610/98).',
                alignment: 'right'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'IDENTIFICAÇÃO DA EMPRESA ELABORADORA DA AEP …………............................................................................................................4'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'HISTÓRICO DE REVISÕES ........................................................................................................................................................................4'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'IDENTIFICAÇÃO DA EMPRESA ................................................................................................................................................................5'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'DESCRIÇÃO GERAL DA ORGANIZAÇÃO..................................................................................................................................................6'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'INTRODUÇÃO ...........................................................................................................................................................................................7'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'OBJETIVOS ...............................................................................................................................................................................................8'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'MÉTODOS DE TRABALHO .......................................................................................................................................................................9'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'MATRIZ DE GRADUAÇÃO DE RISCOS E PERIGOS ................................................................................................................................11'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'AVALIAÇÃO DAS SITUAÇÕES DE TRABALHO ......................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: '1.  ADMINISTRAÇÃO GERAL ORL NDIA ................................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ANALISTA FISCAL PL. .............................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'AVALIAÇÃO DAS SITUAÇÕES DE TRABALHO ......................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: '1.  ADMINISTRAÇÃO GERAL ORL NDIA ................................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ANALISTA FISCAL PL. .............................................................................................................................................13'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ASSISTENTE FISCAL ...............................................................................................................................................16'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ASSISTENTE FISCAL ...............................................................................................................................................18'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ASSISTENTE FISCAL ...............................................................................................................................................20'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CARGO/FUNÇÃO: ASSISTENTE FISCAL ...............................................................................................................................................22'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'VALIDADE TÉCNICA ...............................................................................................................................................................................24'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'CONCLUSÃO ...........................................................................................................................................................................................25'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'REFERÊNCIAS BIBLIOGRÁFICAS ..........................................................................................................................................................26'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'DISPOSIÇÕES FINAIS .............................................................................................................................................................................27'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'IDENTIFICAÇÃO DA EMPRESA ELABORADORA DA AEP',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                alignment: 'left',
                fontSize: 10,
                table: {
                    widths: [140, 170, 50, 170],
                    body: [
                        [{ text: 'Razão Social:', bold: true }, { text: 'ERGOGROUP - Segurança do Trabalho LTDA', bold: true, colSpan: 3, }, '', ''],
                        [{ text: 'CNPJ:', bold: true }, '21.135.906/000-19', { text: 'I.E:', bold: true }, 'Isento'],
                        [{ text: 'Endereço:', bold: true }, { text: 'Rua Santo Antônio, nº 145', colSpan: 3 }, '', ''],
                        [{ text: 'Bairro:', bold: true }, 'Centro', { text: 'CEP:', bold: true }, '38010-160'],
                        [{ text: 'Cidade:', bold: true }, 'Uberaba', { text: 'UF:', bold: true }, 'MG'],
                        [{ text: 'Telefone:', bold: true }, '(34) 3333-9987', { text: 'E-mail:', bold: true }, 'contato@ergogroup.com.br'],

                    ]
                }
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                alignment: 'center',
                fontSize: 10,
                table: {
                    widths: [145, 145, 250],
                    body: [
                        [{ text: 'Responsável Técnico:', bold: true, alignment: 'left', rowSpan: 4 }, '', ''],
                        ['', { text: 'Nome:', bold: true, alignment: 'left' }, 'Amanda Viviane Muniz Rodrigues'],
                        ['', { text: 'Habilitação:', bold: true, alignment: 'left' }, 'Fisioterapeuta / Especialista em Ergonomia'],
                        ['', { text: 'Registro:', bold: true, alignment: 'left' }, 'CREFITO 4/127866F'],
                    ]
                }
            },
            {
                text: '\n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'HISTÓRICO DE REVISÕES',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                fontSize: 10,
                alignment: 'center',
                table: {
                    widths: [50, 115, 115, 115, 128],
                    heights: [30, 30, 30, 30, 30, 30],
                    body: [
                        [{ text: 'Rev.', bold: true }, { text: 'Data', bold: true }, { text: 'Executado por', bold: true }, { text: 'Verificado por', bold: true }, { text: 'DESCRIÇÃO E/OU FOLHAS ATINGIDAS', bold: true }],
                        ['00', '30/05/2023', 'ERGOGROUP', 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda', 'Emissão Inicial'],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],

                    ]
                }
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n '
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'IDENTIFICAÇÃO DA EMPRESA',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                alignment: 'left',
                fontSize: 10,
                table: {
                    widths: [140, 170, 50, 170],
                    body: [
                        [{ text: 'Razão Social:', bold: true }, { text: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda', colSpan: 3, }, '', ''],
                        [{ text: 'Nome Fantasia:', bold: true }, { text: 'Usina Colorado', colSpan: 3, }, '', ''],
                        [{ text: 'CNPJ:', bold: true }, '51.990.778/0001-26', { text: 'I.E:', bold: true }, '322009110112'],
                        [{ text: 'Endereço:', bold: true }, { text: 'Fazenda São José da Glória', colSpan: 3 }, '', ''],
                        [{ text: 'Bairro:', bold: true }, 'Zona Rural', { text: 'CEP:', bold: true }, '14.790-000'],
                        [{ text: 'Cidade:', bold: true }, 'Guaíra', { text: 'UF:', bold: true }, 'SP'],
                        [{ text: 'Telefone:', bold: true }, '017 3330-3385', { text: 'E-mail:', bold: true }, 'valeria.jorge@colorado.com.br'],
                        [{ text: 'Ramo de Atividade:', bold: true }, 'Produção de Álcool', { text: 'Atividade Principal:', bold: true }, 'Produção de Açúcar, Álcool e Energia Elétrica'],
                        [{ text: 'CNAE:', bold: true }, '19.31-4-00', { text: 'Grau de Risco:', bold: true }, '3'],


                    ]
                }
            },
            {
                text: '\n'
            },
            {
                style: 'tableExample',
                alignment: 'center',
                fontSize: 10,
                table: {
                    widths: [145, 145, 250],
                    body: [
                        [{ text: 'Gestor do Contrato:', bold: true, alignment: 'left', rowSpan: 4 }, '', ''],
                        ['', { text: 'Nome:', bold: true, alignment: 'left' }, 'Valéria Cristina Lellis Jorge'],
                        ['', { text: 'Telefone:', bold: true, alignment: 'left' }, '(17) 3330-3385'],
                        ['', { text: 'Email:', bold: true, alignment: 'left' }, 'valeria.jorge@colorado.com.br'],
                    ]
                }
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'DESCRIÇÃO GERAL DA ORGANIZAÇÃO',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                text: 'O Grupo Colorado é uma empresa brasileira, fundada em 1963 por Oswaldo Ribeiro de Mendonça. As primeiras atividades produtivas estão ligadas à pecuária e às culturas de milho, soja e algodão. Em 1970, passou a processar sementes melhoradas, atingindo projeção nacional, com a produção de sementes de capim, soja, milho híbrido e produtos especiais. Data da década de 70 a criação de um centro de pesquisa, de caráter pioneiro, dedicado à melhoria genética de vegetais. Em 1979, passou a atuar no segmento alcooleiro. A primeira safra da então Destilaria Colorado, localizada no município de Guaíra, aconteceu no ano de 1982. A partir de 1991, passou a produzir açúcar, tornando-se Usina Colorado. Em 2008, ampliou o seu parque industrial e atingiu a capacidade de processamento de 7,5 milhões de toneladas de cana-de-açúcar. Figura entre as maiores unidades do setor em volume de moagem. Também em 2008, o Grupo Colorado aumentou a capacidade instalada de geração para 52,76 MW de energia elétrica a partir da biomassa da cana. Parte desta energia elétrica é comercializada.'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'INTRODUÇÃO',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  A Ergonomia é o estudo da adaptação do trabalho ao homem (VIEIRA, 2000; IIDA, 2000). Foi definida como “o  conjunto  de  conhecimentos  científicos  relativos  ao  homem  e  necessários  à  concepção  de  instrumentos, máquinas e dispositivos que possam ser utilizados com o máximo de conforto, segurança e eficiência” (LAVILLE, 1977). O termo ergonomia formado pelas palavras do grego ergon (trabalho) e nomos (regras, leis), foi proposto em 1857 pelo naturalista polonês Woiitej Yastembowski, usado pela primeira vez em 1949 pelo inglês Murrel e adotado oficialmente nesse mesmo ano pela Ergonomics Research Society, da Inglaterra.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  Este Documento foi elaborado de acordo com as diretrizes da NR 17, Portaria MTP n° 423, de 7 de outubro de 2021, DOU 07/10/2021 e suas relações para com a NR 01, Portaria SEPRT n° 6.730, de 9 de março de 2020, DOU 12/03/2020.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  Conforme item 1.5.3.2.1 da NR-01 “A organização deve considerar as condições de trabalho, nos termos da NR-17”.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  Conforme  item  17.3.1  da  NR-17  “A  organização  deve  realizar  a avaliação  ergonômica  preliminar  das situações de trabalho que, em decorrência da natureza e conteúdo das atividades requeridas, demanda adaptação às  características  psicofisiológicas  dos  trabalhadores,  a  fim  de  subsidiar  a  implementação  das  medidas  de prevenção e adequações necessárias previstas nesta NR”. '
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  As informações apresentadas neste documento, descrevem uma avaliação das condições ergonômicas de trabalho para composição do Gerenciamento de Riscos Ocupacionais – GRO que deve constituir o Inventário de Riscos Ergonômicos e compor o Programa de Gerenciamento de Riscos – PGR, no que tange em:'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: '  As informações apresentadas neste documento, descrevem uma avaliação das condições ergonômicas de trabalho para composição do Gerenciamento de Riscos Ocupacionais – GRO que deve constituir o Inventário de Riscos Ergonômicos e compor o Programa de Gerenciamento de Riscos – PGR, no que tange em:'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                ol: [
                    'Identificar o Perigo (ou fator de risco) e possíveis lesões ou agravos à saúde;',
                    'Avaliar os riscos ocupacionais indicando o nível de risco;',
                    'Classificar  os  riscos  ocupacionais para  determinar  a  necessidade  de  adoção  de  medidas  de prevenção; ',
                    'Acompanhar o controle dos riscos ocupacionais;'
                ]
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'OBJETIVO',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Esta Avaliação Ergonômica Preliminar tem como principal objetivo realizar o levantamento preliminar dos perigos  e  riscos  ergonômicos  presentes  nas  diferentes  atividades  de  trabalho,  sob  a  perspectivas  dos conhecimentos da ergonomia, e está estruturado a partir dos métodos descritos neste documento e seguidos pela empresa ERGOGROUP®, que oferece uma metodologia sistematizada de reconhecimento dos perigos de natureza ergonômica, avaliação e classificação dos riscos associados.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Ao mesmo tempo, destaca-se que este relatório não substitui a AET, que deverá ser elaborada conforme o descrito na NR-17.3.3. '
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Reforça-se ainda, que a AEP é  um estudo de identificação de perigos e  avaliação de risco, produzindo indicadores de reconhecimento das condições ergonômicas de trabalho e que deverão ser contemplados junto às determinantes do Gerenciamento de Riscos Ocupacionais (GRO) e seu delineamento no tocante do Programa de Gerenciamento de Riscos (PGR), a fim de constituir o Inventário de Riscos e os determinantes do Plano de Ação, a serem gerenciados pela empresa.'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'MÉTODOS DE TRABALHO',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'O método utilizado nesse serviço tem como base as abordagens preconizadas na NR01 (Portaria SEPRT n.º 6.730, de 09 de março de 2020), NR17 (Portaria/MTP Nº 423, de 7 de outubro de 2021).'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A  Ergonomia  é  uma  importante  ferramenta  para  prevenir  e  solucionar  o  quadro  de  doenças ocupacionais e perdas na produtividade das organizações.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A análise dos dados coletados permite a identificação dos aspectos ergonômicos citados neste relatório, objetivando a adequação às  exigências legais, além das exigências de conforto, segurança e de desempenho eficiente.  Os  aspectos  ergonômicos  observados  foram  priorizados,  entretanto,  dentro  dos  limites  temporais definidos para a avaliação de cada cargo.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Para  esse  trabalho,  iremos  utilizar  uma  abordagem  participativa  dos  trabalhadores,  em  todos  os momentos da intervenção ergonômica. Entende-se que se as pessoas da organização participarem das tomadas de decisão, elas são capazes de experienciar a utilização das suas habilidades, fornecendo a elas um sentimento de  responsabilidade  e  comprometimento  com  a  organização.  Para  tal,  será  criado  um  grupo  de  trabalho, denominado Comitê de Ergonomia (COERGO), o qual ficará responsável por auxiliar na implantação do projeto dentro da empresa.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Para  esse  trabalho,  iremos  utilizar  uma  abordagem  participativa  dos  trabalhadores,  em  todos  os momentos da intervenção ergonômica. Entende-se que se as pessoas da organização participarem das tomadas de decisão, elas são capazes de experienciar a utilização das suas habilidades, fornecendo a elas um sentimento de  responsabilidade  e  comprometimento  com  a  organização.  Para  tal,  será  criado  um  grupo  de  trabalho, denominado Comitê de Ergonomia (COERGO), o qual ficará responsável por auxiliar na implantação do projeto dentro da empresa.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A  AEP  pode  ser  realizada  por  meio  de  abordagens  qualitativas,  semiquantitativas,  quantitativas  ou combinação  dessas,  dependendo  do  risco  e  dos  requisitos  legais,  a  fim  de  identificar  os  perigos  e  produzir informações para o planejamento das medidas de prevenção necessárias. Ela pode ser contemplada nas etapas do  processo  de  identificação  de  perigos  e  de  avaliação  dos  riscos,  descrito  no  item  1.5.4  da  Norma Regulamentadora nº 01 (NR 01) - Disposições Gerais e Gerenciamento de Riscos Ocupacionais.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A AEP deve ser registrada pela organização e esse documento é a formalização desse registro.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A  avaliação  é  feita  por  meio  de  observações,  entrevistas,  análise  documental,  coleta  de  imagens  e confrontação das situações identificadas com a indicação de condições e requisitos da NR 17, em especial em relação aos seus 5 grandes itens:'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                ul: [
                    '17.4 Organização do Trabalho; \n',
                    '17.5 Levantamento, transporte e descarga individual de materiais; \n',
                    '17.6 Mobiliário dos postos de trabalho; \n',
                    '17.7 Máquinas e equipamentos; \n',
                    '17.8 Condições ambientais de trabalho; \n'
                ]
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Após a AEP, foram definidas as seguintes demandas que direcionam essa AET, levantadas através da participação de todos os atores envolvidos nos processos de trabalho desse posto:'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Gatilhos que justificaram a realização da AET'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                ol: [
                    'Quando há a necessidade de uma avaliação mais aprofundada da situação: justifique',
                    'Quando são identificadas inadequações ou insuficiência das ações que já foram adotadas, dentro da dinâmica do  gerenciamento de risco (quando “rodar” o ciclo PDCA) e  o problema não  foi resolvido: justifique',
                    'Quando for  sugerida pelo acompanhamento de saúde dos trabalhadores (PCMSO) e  do item 1.5.5.1.1, alínea C da NR01 (citada abaixo): quando houver relação entre os agravos/adoecimento do trabalhador e as situações de trabalho. Citando a norma, o médico cQuando for observada causa relacionada às condições de trabalho na análise de acidentes (citada no item 1.5.5.5.2), tendo como resultado algum processo judicial ou não. A organização deve realizar a análise de acidentes e de doenças relacionadas ao trabalho, para encontrar as causas e agir preventivamente e corretivamente, para que não ocorram novos acidentes. Quando essa análise estiver relacionada com as condições de trabalho, uma AET deverá ser realizada: justifique',
                    'Quando  for  observada  causa  relacionada  às  condições  de  trabalho  na  análise  das  doenças relacionadas ao trabalho (citada no item 1.5.5.5.2), tendo como resultado algum processo judicial ou não. A organização deve realizar a análise de doenças relacionadas ao trabalho, para encontrar as causas e agir preventivamente e corretivamente, para  que não ocorram agravamentos ou novos adoecimentos. Quando essa análise estiver relacionada com as condições de trabalho, uma AET deverá ser realizada: justifique',
                    'Quando  o  resultado  de  uma  fiscalização  do  Auditor  Fiscal  do  Trabalho  (AFT)  identificar inconsistências no PGR, pode dar o start no processo da necessidade de realização da AET.',
                    'Quando houver situações que geram perda de produtividade, erro do produto e reclamações dos clientes da organização, de forma considerável.'
                ]
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'MATRIZ DE GRADUAÇÂO DE RISCOS E PERIGOS',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'A classificação do Risco Ergonômico seguirá uma adaptação do FMEA (Failure Mode Effect Analysis) aplicado à Gestão de Saúde e Segurança do Trabalho, agregando os itens solicitados na OHSAS 18001, explicados na OHSAS 18002. O principal objetivo é identificar todas as irregularidades e problemas que possam ser ocasionados de forma padronizada.'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'VALIDADE TÉCNICA',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'O prazo de validade desta Avaliação Ergonômica Preliminar reger-se-á em sua parcial ou totalidade, pelas situações que ocorrerem primeiro: validade máxima de 24 (vinte e quatro) meses ou 36 (trinta e seis) meses – no caso de empresas com certificações de gestão de SST  –, a contar da data de emissão do relatório  final,  ou  enquanto  as  condições  de  trabalho  analisadas  não  sofrerem modificações/alterações,  de  modo  a  observar  o  subitem  1.5.4.2.1,  da  NR  1  –  Disposições  Gerais  e Gerenciamento de Riscos Ocupacionais (Brasil, 2020).'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'CONCLUSÃO',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Todos os cargos e principais atividades foram alvo da Avaliação Ergonômica Preliminar (AEP), a qual foi realizada observando os parâmetros indicados na NR17 para as condições de trabalho, que incluem a organização  do  trabalho,  aspectos  relacionados  ao  levantamento,  transporte  e  descarga  de  materiais, mobiliário dos postos de trabalho, trabalho com máquinas, equipamentos e ferramentas manuais, bem como às condições de conforto no ambiente de trabalho.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Constatou-se que existem situações adequadas e que não necessitam de nenhuma intervenção. '
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Constatou-se também  que  existem situações  e  condições de  trabalho  inadequadas e  que  possuem grande potencial para serem resolvidas ainda com medidas mais simples, oriundas da AEP.'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                alignment: 'justify',
                text: 'Para que se cumpra as exigências legais, inclusive das NR 01 e NR 17, deve-se haver continuidade do Programa de Gestão de Ergonomia com a implantação das alterações contidas nesse documento, validações dessas  implantações  pelos  trabalhadores, bem  como  a  validação  das  ações  e  reavaliação da  situação  de trabalho avaliada. Toda essa lógica deve fazer parte do Inventário de Risco Ocupacional, dentro do PGR/GRO.'
            },
            {
                text: '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
            },
            {
                styles: 'header',
                widths: 200,
                margin: [40, 0, 40, 0],
                background: '#122F4E',
                color: '#ffffff',
                bold: true,
                text: 'REFERÊNCIAS BIBLIOGRÁFICAS',
                alignment: 'center'
            },
            {
                text: '\n'
            },
            {
                fontSize: 10,
                lineHeight: 1.35,
                ul: [
                    'Norma Regulamentadora 01 (NR 01) - Disposições Gerais e Gerenciamento de Riscos Ocupacionais -  Redação  dada  pela  Portaria  SEPRT  n.º  6.730,  de  09/03/20  https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-atualizada-2020.pdf/view \n',

                    'Norma Regulamentadora 17  (NR  17)  -  Ergonomia -  Redação da  Portaria/MTP Nº  423, de  7 de outubro  de  2021  -  https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf/view \n',

                    'NBR 13966 – Móveis para Escritório – Mesas – Classificação e características físicas dimensionais e requisitos e métodos de ensino; \n',

                    'NBR 13962 – Móveis para Escritório – Cadeiras – Requisitos e métodos de ensaio; \n',

                    'NBR 13961 – Móveis para Escritório – Armários; \n',

                    'NBR 9050 – Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos; \n',

                    'NBR 11226 – Ergonomia: Avaliação de Posturas Estáticas de Trabalho; \n',

                    'NBR 11228-2 – Ergonomia – Movimentação manual – Parte 2: Empurrar e puxar; \n',

                    'NBR 11228-3 – Ergonomia – Movimentação manual – Parte 3: Movimentação de cargas leves em alta frequência de repetição; \n',

                    'NBR  20646  –  Diretrizes  ergonômicas  para  a  otimização  das  cargas  de  trabalho sobre  o  sistema musculoesquelético; \n',

                    'NHO 11 – Procedimento Técnico – Avaliação dos Níveis de Iluminamento em Ambientes Internos de Trabalho; \n',

                    'GRANDJEAN, K.H.E. Kroemer E. Manual de Ergonomia – Adaptando o Trabalho ao Homem. 5ª edição. Porto Alegre: Bookman, 2005; \n',

                    'NOTA Técnica 060/2001: Ergonomia – indicação de postura a ser adotada na concepção de postos de trabalho. \n',


                ]
            },

        ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                margin: [15, 0, 15, 0],
                text: [
                    '________________________________________________________________________________________________________'
                ]
            },
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            },
            {
                alignment: 'center',
                fontSize: 8,
                text: [

                    { text: "ERGOGROUP SEGURANÇA DO TRABALHO LTDA. \n", bold: true },
                    { text: 'Rua Santo Antônio, 145 - Centro - Uberaba/ MG \n' },
                    { text: '(34) 3333-9987 / contato@ergogroup.com.br' }
                    ,
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
                {
                    width: 180,
                    alignment: 'right',
                    bold: true,
                    margin: [0, 0, 10, 0],
                    text: [
                        { text: "Avaliação Ergonômica Preliminar – AEP \n", color: "#2F5597" },
                        { text: "Revisão 00 (14/03/2023)" }
                    ]
                },

                // {
                //     image: '/public/pdf1.png',
                //     width: 150
                // },
                // {
                //     text: 'Avaliação Ergonômica Preliminar – AEP'
                // }

            ],
        },
        {
            margin: [10, 0, 10, 0],
            text: [
                '___________________________________________________________________________________________________________'
            ]
        },

    ]



    const docDefinitios = {
        // pageSize: 'A4',
        pageMargins: [15, 50, 15, 80],
        header: [Header],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).download();
}

export default clientesPDF;
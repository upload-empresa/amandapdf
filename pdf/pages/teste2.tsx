import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import { Console } from "console";

const App = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const resposta = await fetch("https://dummyjson.com/products");
                const dadosJson = await resposta.json();
                setData(dadosJson.products || []); // Lida com a ausência potencial da propriedade "products"
            } catch (erro) {
                console.error("Erro ao buscar dados:", erro);
            }
        };

        buscarDados();
    }, []);


    const exportarParaExcel = async () => {
        if (!data.length) {
            console.warn("Não há dados para exportar para o Excel. Por favor, busque os dados primeiro.");
            return;
        }

        const workbook = new ExcelJS.Workbook();

        const sheetOne = () => {
            const worksheet = workbook.addWorksheet("DADOS- MATRIZ DE RISCO");
            worksheet.properties.defaultRowHeight = 30;

            worksheet.mergeCells('C1:Q1'); //PARA COLOCAR O TÍTULO AQUI -> FUNCIONOU PERFEITAMENTE
            worksheet.getCell('C1:Q1').value = 'MATRIZ DE GRADUAÇÃO DO RISCO';
            const cellTitle = worksheet.getCell('C1:Q1');

            cellTitle.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000080' }, //Trocar cor depois
            };
            cellTitle.alignment = {
                horizontal: 'center',
                vertical: 'justify',
            };
            cellTitle.font = {
                color: { argb: 'FFFFFF' },
                size: 20 // Aqui você pode especificar o código de cor desejado, em formato ARGB (Alpha, Red, Green, Blue)
            };

            //DEFININDO O TAMANHO DAS COLUNAS DE FORMA ESTÁTICA
            const colunas = [
                { key: "A" },
                { key: "B" },
                { key: "C", width: 15 },
                { key: "D", width: 15 },
                { key: "E" },
                { key: "F", width: 15 },
                { key: "G", width: 15 },
                { key: "H" },
                { key: "I", width: 15 },
                { key: "J", width: 15 },
                { key: "K" },
                { key: "L", width: 15 },
                { key: "M", width: 15 },
                { key: "N" },
                { key: "O", width: 15 },
                { key: "P", width: 15 },
                { key: "Q" },
                { key: "R" },

            ];
            worksheet.columns = colunas;


            const arrayColName: Array<object> = [
                {
                    1: {
                        col: 'C2:D2',
                        title: 'CONCENTRAÇÃO OU NÍVEL'
                    },
                    2: {
                        col: 'F2:G2',
                        title: 'PROBABILIDADE'
                    },
                    3: {
                        col: 'I2:J2',
                        title: 'SEVERIDADE'
                    },
                    4: {
                        col: 'L2:M2',
                        title: 'CONTROLE'
                    },
                    5: {
                        col: 'O2:P2',
                        title: 'RESULTADO'

                    }
                }
            ];

            //SUBTÍTULOS ESTÁTICOS E COM CÉLULAS MESCLADAS-> ESTRUTURAÇÃO
            arrayColName.forEach((column: any) => {
                for (const key in column) {
                    const intervaloMesclado = column[key].col;
                    const [primeiraCelula, ultimaCelula] = intervaloMesclado.split(':');
                    worksheet.mergeCells(`${primeiraCelula}:${ultimaCelula}`);
                    const colName = worksheet.getCell(`${primeiraCelula}:${ultimaCelula}`);
                    colName.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };
                    colName.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };



                    colName.value = column[key].title;

                }
            });



            // for (let i = 4; i < data.length; i++) {
            //     //FOR DE LINHAS -> começa em 0 (linha 1)
            //     worksheet.mergeCells(`C${i}:D${i}`);
            //     worksheet.getCell(`C${i}:D${i}`).value = "";
            //     worksheet.mergeCells(`F${i}:G${i}`);
            //     worksheet.getCell(`F${i}:G${i}`).value = "";
            //     worksheet.mergeCells(`I${i}:J${i}`);
            //     worksheet.getCell(`I${i}:J${i}`).value = "";
            //     worksheet.mergeCells(`L${i}:M${i}`);
            //     worksheet.getCell(`L${i}:M${i}`).value = 'Sub4';
            //     worksheet.mergeCells(`O${i}:P${i}`);
            //     worksheet.getCell(`O${i}:P${i}`).value = 'Sub5';
            // }
            // //ABRIR O ARRAY DE DATA - PASSAR CADA DADO CERTINHO PRA CADA CÉLULA
            // const arrayData = data.forEach((value) => {
            //     for (let i = 3; i < data.length; i++) { //O FOR ESTÁ TRAVANDO O PREENCHIMENTO
            //         //FOR DE LINHAS -> começa em 0 (linha 1)
            //         worksheet.getCell(`C${i}:D${i}`).value = value.brand;
            //         worksheet.getCell(`F${i}:G${i}`).value = value.title;
            //         worksheet.getCell(`I${i}:J${i}`).value = value.title;
            //         worksheet.getCell(`L${i}:M${i}`).value = 'Sub4';
            //         worksheet.getCell(`O${i}:P${i}`).value = 'Sub5';
            //     }
            // });

            //FALTA FAZER A PARTE DO RESULTADO!!!!!!!!!!!!!!!!

        }

        const sheetTwo = () => {
            const worksheet2 = workbook.addWorksheet("DADOS - INF PERIGO E RISCO");
            worksheet2.properties.defaultRowHeight = 30;

            worksheet2.mergeCells('A1:F1');
            worksheet2.getCell('A1:F1').value = 'IDENTIFICAÇÃO DOS PERIGOS';
            const cellTitle = worksheet2.getCell('A1:F1');

            cellTitle.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000080' },
            };
            cellTitle.alignment = {
                horizontal: 'center',
                vertical: 'justify',
            }
            cellTitle.font = {
                color: { argb: 'FFFFFF' },
                size: 20,
            };


            worksheet2.mergeCells('G1:K1');
            worksheet2.getCell('G1:K1').value = 'CONTROLE DOS RISCOS';
            const cellTitle2 = worksheet2.getCell('G1:K1');

            cellTitle2.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000080' },
            };
            cellTitle2.alignment = {
                horizontal: 'center',
                vertical: 'justify',
            };
            cellTitle2.font = {
                color: { argb: 'FFFFFF' },
                size: 20,
            };





            const arrayColName: Array<object> = [
                {
                    1: {
                        col: 'A2',
                        title: 'Fase do Levantamento Preliminar de Perigo'
                    },
                    2: {
                        col: 'B2',
                        title: 'Aspectos Ergonômico'
                    },
                    3: {
                        col: 'C2',
                        title: 'Perigo/Fator de Risco Ergonômico'
                    },
                    4: {
                        col: 'D2',
                        title: 'Fontes e Circunstâncias para o Perigo'
                    },
                    5: {
                        col: 'E2',
                        title: 'Há perigos externos relacionados ao trabalho?'
                    },
                    6: {
                        col: 'F2',
                        title: 'Possíveis Lesões e Agravos'
                    },
                    7: {
                        col: 'G2',
                        title: 'Medidas de Controle Existentes / Implementadas - Engenharia'
                    },
                    8: {
                        col: 'H2',
                        title: 'Medidas de Controle Existentes / Implementadas - Organizacionais'
                    },
                    9: {
                        col: 'I2',
                        title: 'Medidas de Controle Existentes / Implementadas - Individuais'
                    },
                    10: {
                        col: 'J2',
                        title: 'Sugestão de Recomendação'
                    },
                    11: {
                        col: 'K2',
                        title: 'Necessita de AET'
                    },
                    12: {
                        col: 'L2',
                        title: 'Jornada de Trabalho'
                    },
                    13: {
                        col: 'M2',
                        title: 'Posto de Trabalho'
                    },
                    14: {
                        col: 'N2',
                        title: 'Tipo de Atividade'
                    }

                }
            ];



            let widthCol = 30;
            const colunas = [
                { key: "A", width: widthCol },
                { key: "B", width: widthCol },
                { key: "C", width: widthCol },
                { key: "D", width: widthCol },
                { key: "E", width: widthCol },
                { key: "F", width: widthCol },
                { key: "G", width: widthCol },
                { key: "H", width: widthCol },
                { key: "I", width: widthCol },
                { key: "J", width: widthCol },
                { key: "K", width: widthCol },
                { key: "L", width: widthCol },
                { key: "M", width: widthCol },
                { key: "N", width: widthCol },
                { key: "O", width: widthCol },

            ];
            worksheet2.columns = colunas;

            //SUBTÍTULOS ESTÁTICOS E COM CÉLULAS MESCLADAS-> ESTRUTURAÇÃO
            arrayColName.forEach((column: any) => {
                for (const key in column) {
                    // console.log(key);
                    // console.log(column[key].title);
                    // const columnNameLenght = column[key].title.length;
                    // console.log(columnNameLenght)
                    const ColumnSubTitle = column[key].col;
                    const colName = worksheet2.getCell(ColumnSubTitle);
                    colName.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };
                    colName.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    colName.value = column[key].title;

                }
            });

        }

        const sheetThree = () => {
            const worksheet3 = workbook.addWorksheet("AEP");
            worksheet3.properties.defaultRowHeight = 30;

            const arrayTitles: Array<object> = [
                {
                    1: {
                        col: 'B1:Z1',
                        title: 'AVALIAÇÃO ERGONÔMICA PRELIMINAR - NR-17'
                    },
                    2: {
                        col: 'B14:L14',
                        title: 'IDENTIFICAÇÃO DOS PERIGOS'
                    },
                    3: {
                        col: 'M14:X14',
                        title: 'AVALIAÇÃO DOS RISCOS'
                    },
                    4: {
                        col: 'Y14:Z14',
                        title: 'CONTROLE DOS RISCOS'
                    }
                }
            ];

            arrayTitles.forEach((column: any) => {
                for (const key in column) {
                    const intervaloMesclado = column[key].col;
                    const [primeiraCelula, ultimaCelula] = intervaloMesclado.split(':');
                    worksheet3.mergeCells(`${primeiraCelula}:${ultimaCelula}`);

                    const titleArray = worksheet3.getCell(`${primeiraCelula}:${ultimaCelula}`);

                    titleArray.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '000080' },
                    };
                    titleArray.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    titleArray.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                        size: 15,
                    };
                    titleArray.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    titleArray.value = column[key].title;
                }
            })

            const colunas = [
                { key: "A" },
                { key: "B" },
                { key: "C" },
                { key: "D" },
                { key: "E" },
                { key: "F" },
                { key: "G" },
                { key: "H" },
                { key: "I" },
                { key: "J" },
                { key: "K" },
                { key: "L" },
                { key: "M" },
                { key: "N" },
                { key: "O" },

            ];
            worksheet3.columns = colunas;

            const arrayColName: Array<object> = [
                {
                    1: {
                        col: 'B2:I2',
                        title: 'EMPRESA'
                    },
                    2: {
                        col: 'J2:O2',
                        title: 'CNPJ'
                    },
                    3: {
                        col: 'P2:T2',
                        title: 'UNIDADE'
                    },
                    4: {
                        col: 'U2:Z2',
                        title: 'ERGONOMISTA RESPONSÁVEL'
                    },
                    5: {
                        col: 'B4:E4',
                        title: 'ÁREA AVALIADA'
                    },
                    6: {
                        col: 'F4:I4',
                        title: 'SETOR'
                    },
                    7: {
                        col: 'J4:O4',
                        title: 'CARGO/FUNÇÃO'
                    },
                    8: {
                        col: 'P4:T4',
                        title: 'TIPO DE ATIVIDADE'
                    },
                    9: {
                        col: 'U4:X4',
                        title: 'DATA DA ELABORAÇÃO'
                    },
                    10: {
                        col: 'Y4:Z4',
                        title: 'REVISÃO DOCUMENTO'
                    },
                    11: {
                        col: 'B6:I6',
                        title: 'JORNADA DE TRABALHO'
                    },
                    12: {
                        col: 'J6:L6',
                        title: 'VARIAÇÃO DE TURNO'
                    },
                    13: {
                        col: 'M6:O6',
                        title: 'TRABALHO NOTURNO'
                    },
                    14: {
                        col: 'P6:R6',
                        title: 'Nº  TRAB. EXPOSTOS'
                    },
                    15: {
                        col: 'S6:Z6',
                        title: 'DESCRIÇÃO DO AMBIENTE DE TRABALHO'
                    },
                    16: {
                        col: 'B8:L8',
                        title: 'TAREFA PRESCRITA'
                    },
                    17: {
                        col: 'M8:Z8',
                        title: 'TAREFA REAL'
                    },
                    18: {
                        col: 'B10:Z10',
                        title: 'CONSIDERAÇÕES DO(A) AVALIADOR(A)'
                    },

                    //NÃO PODE PASSAR DA CÉLULA 10 POR CAUSA DA LÓGICA DE PEGAR A LINHA DEBAIXO

                }
            ];


            const mergeCellStyle = ((cellPartOne: string, cellPartTwo: string) => {
                const cellStyle = worksheet3.getCell(`${cellPartOne}:${cellPartTwo}`);
                cellStyle.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF' },
                };
                cellStyle.alignment = {
                    horizontal: 'center',
                    wrapText: true,
                    vertical: 'justify',
                };
                cellStyle.font = {
                    color: { argb: 'FF000000' },
                    size: 14,
                    bold: true,
                };
                cellStyle.border = {
                    top: { style: 'medium', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'medium', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } },
                };
            });

            arrayColName.forEach((column: any) => {

                //ESSE CÓDIGO PODE DAR MERDA PORQUE ELE COLOCA UMA LINHA ABAIXO DO SUBTITULO, PORÉM, SE TIVER MAIS DE UM DADO, COMO ELE VAI COLOCAR MAIS LINHAS?
                //O CÓDIGO SE BASEIA NO ARRAY DE SUBTITULOS PARA COLOCAR OS CAMPOS

                for (const key in column) {
                    const intervaloMesclado = column[key].col;
                    const [primeiraCelula, ultimaCelula] = intervaloMesclado.split(':');
                    worksheet3.mergeCells(`${primeiraCelula}:${ultimaCelula}`);

                    //SEPARA OS CARACTERES DA STRING - FAZ COM QUE O CARACTER QUE REPRESENTE O NÚMERO SEJA CONVERTIDO PRA NUMBER - CONVERTE DE VOLTA PARA STRING E DA MERGE NA CELULA;
                    const toSeparate: Array<string> = intervaloMesclado.split('');
                    const lenghtArray: number = toSeparate.length;

                    if (lenghtArray == 5) {
                        // console.log("Array com apenas 1 dígito (0 a 9)");
                        let newNumberCell1: number = parseInt(toSeparate[1]);
                        let newNumberCell2: number = parseInt(toSeparate[4]);

                        newNumberCell1 = newNumberCell1 + 1;
                        newNumberCell2 = newNumberCell2 + 1;

                        let newStringCell1: string = newNumberCell1.toString();
                        let newStringCell2: string = newNumberCell2.toString();

                        toSeparate[1] = newStringCell1;
                        toSeparate[4] = newStringCell2;

                        const stringJoints = toSeparate.join(",").replace(/,/g, "");
                        const [newCellOne, newCellTwo] = stringJoints.split(':');
                        worksheet3.mergeCells(`${newCellOne}:${newCellTwo}`); //RESPONSÁVEL POR DEIXAR A LINHA ABAIXO AO SUBTÍTULO PADRONIZADA E MERGEADA DO MESMO TAMANHO.

                        mergeCellStyle(newCellOne, newCellTwo);
                        // //QUANDO FOR INTEGRAR, ACHO QUE PRECISA SER AQUI POR CAUSA DAS CÉLULAS NOVAS!!!!!!!

                    } else {
                        // console.log("Array com apenas 2 dígitos (10 pra cima)");
                        let newNumberPosition1: number = parseInt(toSeparate[1]);
                        let newNumberPosition2: number = parseInt(toSeparate[2]);
                        let newNumberPosition5: number = parseInt(toSeparate[5]);
                        let newNumberPosition6: number = parseInt(toSeparate[6]);

                        //LOGICA -> SOMAR 1 NA POSIÇÃO 1 E 5 DO VETOR, SOMENTE SE O VALOR DAS POSIÇÕES 2 E 6 FOREM 9 -> APÓS SOMAR 1, VOLTE O VALOR DA 2 E 6 PARA ZERO. (ESSA LÓGICA SÓ FUNCIONA COM NUM ATÉ 100)

                        if (newNumberPosition2 && newNumberPosition6 == 9) {

                            newNumberPosition1 = newNumberPosition1 + 1;
                            newNumberPosition5 = newNumberPosition5 + 1;

                            newNumberPosition2 = newNumberPosition2 - 9;
                            newNumberPosition6 = newNumberPosition6 - 9;


                            let newStringPosition1: string = newNumberPosition1.toString();
                            let newStringPosition2: string = newNumberPosition2.toString();
                            let newStringPosition5: string = newNumberPosition5.toString();
                            let newStringPosition6: string = newNumberPosition6.toString();

                            toSeparate[1] = newStringPosition1;
                            toSeparate[2] = newStringPosition2;
                            toSeparate[5] = newStringPosition5;
                            toSeparate[6] = newStringPosition6;

                            // console.log(toSeparate);
                            const stringJoints = toSeparate.join(",").replace(/,/g, "");
                            const [newCellOne, newCellTwo] = stringJoints.split(':');
                            worksheet3.mergeCells(`${newCellOne}:${newCellTwo}`);

                            mergeCellStyle(newCellOne, newCellTwo);

                        } else {
                            //MEXE SÓ COM AS CÉLULAS DA DIREITA
                            newNumberPosition2 = newNumberPosition2 + 1;
                            newNumberPosition6 = newNumberPosition6 + 1;

                            let newStringPosition2: string = newNumberPosition2.toString();
                            let newStringPosition6: string = newNumberPosition6.toString();

                            toSeparate[2] = newStringPosition2;
                            toSeparate[6] = newStringPosition6;

                            const stringJoints = toSeparate.join(",").replace(/,/g, "");
                            const [newCellOne, newCellTwo] = stringJoints.split(':');
                            worksheet3.mergeCells(`${newCellOne}:${newCellTwo}`); //RESPONSÁVEL POR DEIXAR A LINHA ABAIXO AO SUBTÍTULO PADRONIZADA E MERGEADA DO MESMO TAMANHO.

                            mergeCellStyle(newCellOne, newCellTwo);
                        }
                    }

                    const colName = worksheet3.getCell(`${primeiraCelula}:${ultimaCelula}`);
                    colName.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };

                    colName.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    colName.value = column[key].title;

                }
            });

            const arrayColSheetTwo: Array<object> = [
                {
                    1: {
                        col: 'B15:C15',
                        col2: 'B16:C16',
                        title: 'Fase do Levantamento Preliminar de Perigo',
                        title2: ''
                    },
                    2: {
                        col: 'D15:D15',
                        col2: 'D16:D16',
                        title: 'Aspecto Ergonômico',
                        title2: ''
                    },
                    3: {
                        col: 'E15:F15',
                        col2: 'E16:F16',
                        title: 'Perigo /Fonte de Risco',
                        title2: ''
                    },
                    4: {
                        col: 'G15:H15',
                        col2: 'G16:H16',
                        title: 'Fontes e Circunstâncias para o Perigo',
                        title2: ''
                    },
                    5: {
                        col: 'I15:J15',
                        col2: 'I16:J16',
                        title: 'Há perigos externos relacionados ao trabalho?',
                        title2: ''
                    },
                    6: {
                        col: 'K15:L15',
                        col2: 'K16:L16',
                        title: 'Possíveis Lesões e Agravos',
                        title2: ''
                    },
                    7: {
                        col: 'M15:R15',
                        col2: 'M999:R999',
                        title: 'Medidas de Controle Existentes / Implementadas',
                        title2: ''
                    },
                    8: {
                        col: 'S15:T15',
                        col2: 'S16:T16',
                        title: 'Registro Fotográfico',
                        title2: ''
                    },
                    9: {
                        col: 'U15:X15',
                        col2: 'U999:X999',
                        title: 'Classificação do Risco',
                        title2: ''
                    },
                    10: {
                        col: 'Y15:Y15',
                        col2: 'Y16:Y16',
                        title: 'Sugestão de Recomendação',
                        title2: ''
                    },
                    11: {
                        col: 'Z15:Z15',
                        col2: 'Z16:Z16',
                        title: 'Necessita de AET',
                        title2: ''
                    },
                },
            ];

            console.log(arrayColSheetTwo);


            arrayColSheetTwo.forEach((column: any) => {
                for (const key in column) {
                    const intervaloMesclado: string = column[key].col;
                    const intervaloMesclado2: string = column[key].col2;

                    const [primeiraCelula, ultimaCelula] = intervaloMesclado.split(':');
                    const [primeiraCelula2, ultimaCelula2] = intervaloMesclado2.split(':');

                    worksheet3.mergeCells(`${primeiraCelula}:${ultimaCelula}`);
                    worksheet3.mergeCells(`${primeiraCelula2}:${ultimaCelula2}`);

                    const colName = worksheet3.getCell(`${primeiraCelula}:${ultimaCelula}`);
                    colName.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };
                    colName.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    colName.value = column[key].title;

                    const colName2 = worksheet3.getCell(`${primeiraCelula2}:${ultimaCelula2}`);
                    colName2.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName2.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName2.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };


                    colName2.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    colName2.value = column[key].title2;

                }
            });

            function styleCell(cell: string, value: string) {
                worksheet3.mergeCells(cell);
                worksheet3.getCell(cell).value = value;

                const colName2 = worksheet3.getCell(cell);

                colName2.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'B0C4DE' },
                };
                colName2.alignment = {
                    horizontal: 'center',
                    wrapText: true,
                    vertical: 'justify',
                };
                colName2.font = {
                    color: { argb: 'FFFFFF' },
                    bold: true,
                };

                colName2.border = {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } },
                };
            }


            styleCell('M16:N16', 'Engenharia');
            styleCell('O16:P16', 'Organizacional');
            styleCell('Q16:R16', 'Individual');
            styleCell('U16', 'Prob.');
            styleCell('V16', 'Sev.');
            styleCell('W16', 'Cont.');
            styleCell('X16', 'Class.');

        }

        const sheetFour = () => {
            const worksheet4 = workbook.addWorksheet("PLANO DE AÇÃO - AEP");
            worksheet4.properties.defaultRowHeight = 30;

            worksheet4.mergeCells('A1:M1');
            worksheet4.getCell('A1:M1').value = 'PLANO DE AÇÃO - ERGONOMIA (AEP)';
            const cellTitle = worksheet4.getCell('A1:M1');

            cellTitle.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000080' },
            };
            cellTitle.alignment = {
                horizontal: 'center',
                vertical: 'justify',
            }
            cellTitle.font = {
                color: { argb: 'FFFFFF' },
                size: 20,
            };

            let widthCol = 30;
            const colunas = [
                { key: "A", width: widthCol },
                { key: "B", width: widthCol },
                { key: "C", width: widthCol },
                { key: "D", width: widthCol },
                { key: "E", width: widthCol },
                { key: "F", width: widthCol },
                { key: "G", width: widthCol },
                { key: "H", width: widthCol },
                { key: "I", width: widthCol },
                { key: "J", width: widthCol },
                { key: "K", width: widthCol },
                { key: "L", width: widthCol },
                { key: "M", width: widthCol },
                { key: "N", width: widthCol },
                { key: "O", width: widthCol },

            ];
            worksheet4.columns = colunas;

            const arrayColName: Array<object> = [
                {
                    1: {
                        col: 'A2',
                        title: 'Item'
                    },
                    2: {
                        col: 'B2',
                        title: 'O QUE FAZER? (AÇÃO)'
                    },
                    3: {
                        col: 'C2',
                        title: 'LEGISLAÇÃO'
                    },
                    4: {
                        col: 'D2',
                        title: 'CÓDIGO DO DOCUMENTO'
                    },
                    5: {
                        col: 'E2',
                        title: 'ORIGEM DA DEMANDA'
                    },
                    6: {
                        col: 'F2',
                        title: 'ONDE? (CARGO/FUNÇÃO)'
                    },
                    7: {
                        col: 'G2',
                        title: 'POR QUE? (RISCO ERGONÔMICO)'
                    },
                    8: {
                        col: 'H2',
                        title: 'RESPONSÁVEL'
                    },
                    9: {
                        col: 'I2',
                        title: 'QUANDO?'
                    },
                    10: {
                        col: 'J2',
                        title: 'PRAZO (DIAS)'
                    },
                    11: {
                        col: 'K2',
                        title: 'PREVISÃO DE TÉRMINO'
                    },
                    12: {
                        col: 'L2',
                        title: 'TÉRMINO REAL'
                    },
                    13: {
                        col: 'M2',
                        title: 'STATUS'
                    },
                    14: {
                        col: 'N2',
                        title: 'EVIDÊNCIA'
                    }

                }
            ];

            arrayColName.forEach((column: any) => {
                for (const key in column) {
                    const ColumnSubTitle = column[key].col;
                    const colName = worksheet4.getCell(ColumnSubTitle);
                    colName.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'B0C4DE' },
                    };
                    colName.alignment = {
                        horizontal: 'center',
                        wrapText: true,
                        vertical: 'justify',
                    };
                    colName.font = {
                        color: { argb: 'FFFFFF' },
                        bold: true,
                    };
                    colName.border = {
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    colName.value = column[key].title;

                }
            });

        }

        //CRIA O BUFFER DOS DADOS DA PLANILHA (WORKBOOK)
        sheetOne();
        sheetTwo();
        sheetThree();
        sheetFour();
        const buffer = await workbook.xlsx.writeBuffer();

        // Implemente a lógica de download ou exibição no lado do cliente (fora deste componente)
        // Este exemplo demonstra como disparar um download por meio de um link temporário:
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
        link.download = "PlanilhaErgoGroup.xlsx";
        link.click();
        URL.revokeObjectURL(link.href); // Limpe a URL temporária
    };

    return (
        <div style={{ padding: "30px" }}>
            <button className="btn btn-primary float-end mt-2 mb-2" onClick={exportarParaExcel}>
                Exportar
            </button>
            <h3>Dados da tabela:</h3>
            <table className="table table-bordered">
                <thead style={{ background: "yellow" }}>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Título</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Avaliação</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) &&
                        data.map((linha: any) => (
                            <tr key={linha.id}> {/* Adiciona chave única para cada linha */}
                                <td>{linha.id}</td>
                                <td>{linha.title}</td>
                                <td>{linha.brand}</td>
                                <td>{linha.category}</td>
                                <td>${linha.price}</td>
                                <td>{linha.rating}/5</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;

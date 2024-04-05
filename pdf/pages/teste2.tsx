import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";



const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then(async (data) => {
                console.log(data);
                setData(data);
            })
            .then((json) => console.log(json));
    }, []);

    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        // const sheet = workbook.addWorksheet("My Sheet");
        const sheet = workbook.addWorksheet('My Sheet', {
            headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" }
        });
        // Set footer (default centered), result: "Page 2 of 16"
        sheet.headerFooter.oddFooter = "Page &P of &N";
        sheet.properties.defaultRowHeight = 40;

        // merge a range of cells
        sheet.mergeCells('A1:Z1');

        // ... merged cells are linked
        sheet.getCell('A1').value = 'AVALIAÇÃO ERGONÔMICA PRELIMINAR - NR-17 ';

        sheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '1F3864' },
        };
        //testando
        // for the graduate graphic designers...
        sheet.getCell('A1').font = {
            // name: 'Arial Black',
            color: { argb: 'FFFFFF' },
            // family: 2,
            // size: 14,
            // // italic: true
        };
        //testando

        =SE(E(AE16>=0,1;AE16<=6);'DADOS - MATRIZ DE RISCO'!$L$7;SE(E(AE16>=6,1;AE16<=12);'DADOS - MATRIZ DE RISCO'!$L$6;SE(E(AE16>=12,1;AE16<=32);'DADOS - MATRIZ DE RISCO'!$L$5;SE(E(AE16>=32,1;AE16<=79);'DADOS - MATRIZ DE RISCO'!$L$4;SE(E(AE16>=80;AE16<=160);'DADOS - MATRIZ DE RISCO'!$L$3;"")))))


        const promise = Promise.all(
            data?.products?.map(async (product, index) => {
                const rowNumber = index + 3; // Start from the third row after the blank row and title row
                sheet.addRow({
                    id: product?.id,
                    title: product?.title,
                    brand: product?.brand,
                    category: product?.category,
                    price: product?.price,
                    rating: product?.rating,
                });
                // Add image if needed
                // if (product?.title === "AVALIAÇÃO ERGONÔMICA PRELIMINAR - NR-17") {
                //     sheet.getRow(rowNumber).height = 20; // Set desired height
                // }
            })
        );

        promise.then(() => {
            // Apply conditional formatting for the price column
            const priceCol = sheet.getColumn(5);
            priceCol.eachCell((cell) => {
                const cellValue = sheet.getCell(cell?.address).value;
                if (cellValue > 50 && cellValue < 1000) {
                    sheet.getCell(cell?.address).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FF0000" },
                    };
                }
            });

            // Write the workbook buffer and initiate download
            workbook.xlsx.writeBuffer().then(function (data) {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "download.xlsx";
                anchor.click();
                window.URL.revokeObjectURL(url);
            });
        });
    };


    return (
        <div style={{ padding: "30px" }}>
            <button
                className="btn btn-primary float-end mt-2 mb-2"
                onClick={exportExcelFile}
            >
                Export
            </button>
            <h3>Table Data:</h3>
            <table className="table table-bordered">
                <thead style={{ background: "yellow" }}>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Rating</th>
                        {/* <th scope="col">Photo</th> */}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data?.products) &&
                        data?.products?.map((row) => (
                            <tr>
                                <td>{row?.id}</td>
                                <td>{row?.title}</td>
                                <td>{row?.brand}</td>
                                <td>{row?.category}</td>
                                <td>${row?.price}</td>
                                <td>{row?.rating}/5</td>
                                {/* <td>
                                    <img src={row?.thumbnail} width="100" />
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
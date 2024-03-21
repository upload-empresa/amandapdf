import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";

const toDataURL = (url) => {
    const promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.readAsDataURL(xhr.response);
            reader.onloadend = function () {
                resolve({ base64Url: reader.result });
            };
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    });

    return promise;
};

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
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 40;

        // Add a new row for the title
        const titleRow = sheet.addRow([]);
        titleRow.getCell(1).value = "AVALIAÇÃO ERGONÔMICA PRELIMINAR - NR-17 ";
        titleRow.getCell(1).alignment = { horizontal: "center" };
        titleRow.getCell(1).font = {
            name: "Calibri",
            family: 4,
            size: 14,
            bold: true,
            color: { argb: "FFFFFF" }
        };
        titleRow.getCell(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "1F3864" }
        };
        sheet.mergeCells("A2:G1");
        sheet.getRow(1).height = 10;

        sheet.columns = [
            {
                header: "Id",
                key: "id",
                width: 10,
            },
            { header: "Title", key: "title", width: 32 },
            {
                header: "Brand",
                key: "brand",
                width: 20,
            },
            {
                header: "Category",
                key: "category",
                width: 20,
            },
            {
                header: "Price",
                key: "price",
                width: 15,
            },
            {
                header: "Rating",
                key: "rating",
                width: 10,
            },
            {
                header: "AVALIAÇÃO ERGONÔMICA PRELIMINAR - NR-17 ",
                key: "thumbnail",
                width: 15,
            },
        ];

        const promise = Promise.all(
            data?.products?.map(async (product, index) => {
                const rowNumber = index + 2; // Start from the second row after the title
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
import * as Excel from "exceljs";
import fs from 'fs';
import { GetServerSideProps } from "next";
import { clearScreenDown } from "readline";

const exportExcelFile = async(props) => {
      
    console.log("entrei")
    console.log(props);
};

export const getServerSideProps = async () => {
    // ✅ Can use fs here (runs only on the server)
    console.log("entrei")
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'dob', width: 15, }
    ];
    
    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
    
    // save under export.xlsx
    //@ts-ignore
    const filePath:Array = './export.xlsx';
    await workbook.xlsx.writeBuffer(filePath);
     
        fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
      
        // Process the file data (buffer)
        console.log('File data:', data);
      });
    console.log(fs)
  
    return {
      props: {
        workbook
      }, // will be passed to the page component as props
    }
  };

export default exportExcelFile;
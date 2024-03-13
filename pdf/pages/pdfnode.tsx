import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const createAndDownloadPdf = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-pdf', formData);
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'newPdf.html');
        } catch (error) {
            console.error('Error creating or downloading PDF:', error);
        }
    };

    return (
        <div>

            <button onClick={createAndDownloadPdf}>Download PDF</button>
        </div>
    );
}

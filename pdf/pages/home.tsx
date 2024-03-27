// import React, { useState, useEffect } from 'react';

// import clientesPDF from '../components/Reports/Clientes/clientes'

// import generatePDF from './page'

// function Home() {

//     const [clientes, setClientes] = useState([]);
//     const [busca, setBusca] = useState('');
//     const [texto, setTexto] = useState('');
//     const [excluido, setExcluido] = useState('');
//     const [confirmacao, setConfirmacao] = useState(false);
//     const [confirmacaoId, setConfirmacaoId] = useState('');


//     function confirmDeleteUser(id) {
//         setConfirmacaoId(id);
//         setConfirmacao(true);
//     }



//     return <div>
//         <div className="container-fluid titulo">
//             <h1>Cadastro de Clientes</h1>

//             <div className="row">
//                 <div className="col-4">
//                     <a> Cliente</a>
//                     <button onClick={(e) => clientesPDF(clientes)} className="btn btn-danger btn-cli" type="button" id="button-addon2"><i className="far fa-file-pdf"></i> Gerar PDF</button>
//                 </div>

//                 <div className="col-8">
//                     <div className="input-group mb-3">
//                         <input onChange={(e) => setTexto(e.target.value)} type="text" className="form-control" placeholder="Pesquisar por nome" aria-describedby="button-addon2" />
//                         <button onClick={(e) => setBusca(texto)} className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i> Pesquisar</button>
//                     </div>
//                 </div>
//             </div>




//         </div>
//     </div>
// }

// export default Home;

import React from 'react';
import { generatePDF } from './page'

function Home() {
    return (
        <div>
            <button onClick={generatePDF}>Gerar PDF</button>
        </div>
    );
}

export default Home;

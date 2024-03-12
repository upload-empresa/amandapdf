const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const axios = require('axios');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');


const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Função para buscar dados da API
async function fetchDataFromAPI() {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/empresa?empresaId=wqdq'
    );
    const apiData = response.data;

    const responseHistorico = await axios.get(
      'http://localhost:3000/api/historico?historicoId=ewfewf54'
    );

    const apiDataHistorico = responseHistorico.data;

    const responsePerigo = await axios.get(
      'http://localhost:3000/api/perigo?perigoId=qwd'
    );

    const apiDataPerigo = responsePerigo.data;

    // ----------> Response Risco
    const responseRisco = await axios.get(
      'http://localhost:3000/api/risco?riscoId=www'
    );
    const apiDataRisco = responseRisco.data;
    // <----------- Response Risco

    // -----------> Response AEP
    const responseAEP = await axios.get(
      'http://localhost:3000/api/aep?ergonomicaId=fewfwef'
    );
    const apiDataAEP = responseAEP.data;
    // <---------- Response AEP

    // ----------> Response Plano
    const responsePlano = await axios.get(
      'http://localhost:3000/api/plano?planoId=qwfef'
    );
    const apiDataPlano = responsePlano.data;
    // <--------- Response Plano

    // ---------> Empresa Const
    const name = apiData.name;
    const email = apiData.email;
    const responsavel_tecnico = apiData.responsavel_tecnico;
    const registro_responsavel_tecnico = apiData.registro_responsavel_tecnico;
    const habilitacao_responsavel_tecnico =
      apiData.habilitacao_responsavel_tecnico;
    const ramo_atividade = apiData.ramo_atividade;
    const atividade_principal = apiData.atividade_principal;
    const cnae = apiData.cnae;
    const grau_risco = apiData.grau_risco;
    const nome_gestor_contrato = apiData.nome_gestor_contrato;
    const telefone_gestor_contrato = apiData.telefone_gestor_contrato;
    const email_gestor_contrato = apiData.email_gestor_contrato;
    const razao_social = apiData.razao_social;
    const ergonomista = apiData.ergonomista;
    const ie = apiData.ie;
    const cep = apiData.cep;
    const setor = apiData.setor;
    const endereco = apiData.endereco;
    const bairro = apiData.bairro;
    const telefone = apiData.telefone;
    const unidadeName = apiData.unidadeName;
    const areaavaliadaName = apiData.areaavaliadaName;
    const cnpj = apiData.cnpj;
    const cidade = apiData.cidade;
    const estado = apiData.estado;
    // ---------> Empresa Const

    // <-------- Historico Const
    const revisao = apiDataHistorico.revisao;
    const data = apiDataHistorico.data;
    const executado = apiDataHistorico.executado;
    const descricao = apiDataHistorico.descricao;
    // ---------> Historico Const

    // <--------- Perigo Const
    const namePerigo = apiDataPerigo.namePerigo;
    const fase_levantamento_preliminar =
      apiDataPerigo.fase_levantamento_preliminar;
    const aspectos_ergonomico = apiDataPerigo.aspectos_ergonomico;
    const fator = apiDataPerigo.fator;
    const fontes = apiDataPerigo.fontes;
    const ha_pergios_externos = apiDataPerigo.ha_pergios_externos;
    const possiveis_lesoes = apiDataPerigo.possiveis_lesoes;
    // ----------> Perigo Const

    // <----------- Risco Const
    const nameRisco = apiDataRisco.nameRisco;
    const sugestacao_recomendacao = apiDataRisco.sugestacao_recomendacao;
    const medidas_controle = apiDataRisco.medidas_controle;
    const necessita_aet = apiDataRisco.necessita_aet;
    const classificacao_riscos_probabilidade =
      apiDataRisco.classificacao_riscos_probabilidade;
    const classificacao_riscos_continuacao =
      apiDataRisco.classificacao_riscos_continuacao;
    const classificacao_riscos_severidade =
      apiDataRisco.classificacao_riscos_severidade;
    const classificacao_riscos_classificacao =
      apiDataRisco.classificacao_riscos_classificacao;
    // -----------> Risco Const

    // <------------ AEP Const
    const nameAEP = apiDataAEP.nameAEP;
    const data_elaboracao = apiDataAEP.data_elaboracao;
    const revisao_documento = apiDataAEP.revisao_documento;
    const jornada_trabalho = apiDataAEP.jornada_trabalho;
    const cargo = apiDataAEP.cargo;
    const tipo_atividade = apiDataAEP.tipo_atividade;
    const variacao_turno = apiDataAEP.variacao_turno;
    const trabalho_noturno = apiDataAEP.trabalho_noturno;
    const descricao_ambiente_trabalho = apiDataAEP.descricao_ambiente_trabalho;
    const numero_trabalhadores_expostos =
      apiDataAEP.numero_trabalhadores_expostos;
    const tarefa_prescrita = apiDataAEP.tarefa_prescrita;
    const tarefa_real = apiDataAEP.tarefa_real;
    const consideracoes_avaliador = apiDataAEP.consideracoes_avaliador;
    const posto_trabalho = apiDataAEP.posto_trabalho;
    const ergonomista_responsavel = apiDataAEP.ergonomista_responsavel;
    // -------------> AEP Const

    // <------------ Plano Const
    const namePlano = apiDataPlano.namePlano;
    const o_que_fazer = apiDataPlano.o_que_fazer;
    const legislacao = apiDataPlano.legislacao;
    const origem_demanda = apiDataPlano.origem_demanda;
    const onde = apiDataPlano.onde;
    const porque = apiDataPlano.porque;
    const responsavel = apiDataPlano.responsavel;
    const quando = apiDataPlano.quando;
    const prazo = apiDataPlano.prazo;
    const previsao_termino = apiDataPlano.previsao_termino;
    const termino_real = apiDataPlano.termino_real;
    const status = apiDataPlano.status;
    const evidencia = apiDataPlano.evidencia;
    // ------------->

    // -------> Empresa
    console.log('nome:', name);
    console.log('email:', email);
    console.log('responsavel_tecnico:', responsavel_tecnico);
    console.log('registro_responsavel_tecnico:', registro_responsavel_tecnico);
    console.log(
      'habilitacao_responsavel_tecnico:',
      habilitacao_responsavel_tecnico
    );
    console.log('ramo_atividade:', ramo_atividade);
    console.log('atividade_principal:', atividade_principal);
    console.log('cnae:', cnae);
    console.log('grau_risco:', grau_risco);
    console.log('nome_gestor_contrato:', nome_gestor_contrato);
    console.log('telefone_gestor_contrato:', telefone_gestor_contrato);
    console.log('email_gestor_contrato:', email_gestor_contrato);
    console.log('razao_social:', razao_social);
    console.log('ergonomista:', ergonomista);
    console.log('ie:', ie);
    console.log('cep:', cep);
    console.log('setor:', setor);
    console.log('endereco:', endereco);
    console.log('bairro:', bairro);
    console.log('telefone:', telefone);
    console.log('unidadeName:', unidadeName);
    console.log('areaavaliadaName:', areaavaliadaName);
    console.log('cnpj:', cnpj);
    console.log('cidade:', cidade);
    console.log('estado:', estado);
    // <------- Empresa

    // --------> Historico
    console.log('revisao:', revisao);
    console.log('data:', data);
    console.log('executado:', executado);
    console.log('descricao:', descricao);
    // <-------- Historico

    // --------> Perigo
    console.log('namePerigo:', namePerigo);
    console.log('fase_levantamento_preliminar:', fase_levantamento_preliminar);
    console.log('aspectos_ergonomico:', aspectos_ergonomico);
    console.log('fator:', fator);
    console.log('fontes:', fontes);
    console.log('ha_pergios_externos:', ha_pergios_externos);
    console.log('possiveis_lesoes:', possiveis_lesoes);
    // <-------- Perigo

    //8 --------> Risco
    console.log('nameRisco:', nameRisco);
    console.log('sugestacao_recomendacao:', sugestacao_recomendacao);
    console.log('medidas_controle:', medidas_controle);
    console.log('necessita_aet:', necessita_aet);
    console.log(
      'classificacao_riscos_probabilidade:',
      classificacao_riscos_probabilidade
    );
    console.log(
      'classificacao_riscos_continuacao:',
      classificacao_riscos_continuacao
    );
    console.log(
      'classificacao_riscos_severidade:',
      classificacao_riscos_severidade
    );
    console.log(
      'classificacao_riscos_classificacao:',
      classificacao_riscos_classificacao
    );
    // <-------- Risco

    // 15 --------> AEP
    console.log('nameAEP:', nameAEP);
    console.log('data_elaboracao:', data_elaboracao);
    console.log('revisao_documento:', revisao_documento);
    console.log('jornada_trabalho:', jornada_trabalho);
    console.log('cargo:', cargo);
    console.log('tipo_atividade:', tipo_atividade);
    console.log('variacao_turno:', variacao_turno);
    console.log('trabalho_noturno:', trabalho_noturno);
    console.log('descricao_ambiente_trabalho:', descricao_ambiente_trabalho);
    console.log(
      'numero_trabalhadores_expostos:',
      numero_trabalhadores_expostos
    );
    console.log('tarefa_prescrita:', tarefa_prescrita);
    console.log('tarefa_real:', tarefa_real);
    console.log('consideracoes_avaliador:', consideracoes_avaliador);
    console.log('posto_trabalho:', posto_trabalho);
    console.log('ergonomista_responsavel:', ergonomista_responsavel);
    // <--------- AEP

    //13 ----------> Plano
    console.log('namePlano:', namePlano);
    console.log('o_que_fazer:', o_que_fazer);
    console.log('legislacao:', legislacao);
    console.log('origem_demanda:', origem_demanda);
    console.log('onde:', onde);
    console.log('porque:', porque);
    console.log('responsavel:', responsavel);
    console.log('quando:', quando);
    console.log('prazo:', prazo);
    console.log('previsao_termino:', previsao_termino);
    console.log('termino_real:', termino_real);
    console.log('status:', status);
    console.log('evidencia:', evidencia);
    // <----------- Plano

    return {
      name,
      email,
      responsavel_tecnico,
      registro_responsavel_tecnico,
      habilitacao_responsavel_tecnico,
      ramo_atividade,
      atividade_principal,
      cnae,
      grau_risco,
      nome_gestor_contrato,
      telefone_gestor_contrato,
      email_gestor_contrato,
      razao_social,
      ergonomista,
      ie,
      cep,
      setor,
      endereco,
      bairro,
      telefone,
      unidadeName,
      areaavaliadaName,
      cnpj,
      cidade,
      estado,
      revisao,
      data,
      executado,
      descricao,
      namePerigo,
      fase_levantamento_preliminar,
      aspectos_ergonomico,
      fator,
      fontes,
      ha_pergios_externos,
      possiveis_lesoes,
      nameRisco,
      sugestacao_recomendacao,
      medidas_controle,
      necessita_aet,
      classificacao_riscos_probabilidade,
      classificacao_riscos_continuacao,
      classificacao_riscos_severidade,
      classificacao_riscos_classificacao,
      nameAEP,
      data_elaboracao,
      revisao_documento,
      jornada_trabalho,
      cargo,
      tipo_atividade,
      variacao_turno,
      trabalho_noturno,
      descricao_ambiente_trabalho,
      numero_trabalhadores_expostos,
      tarefa_prescrita,
      tarefa_real,
      consideracoes_avaliador,
      posto_trabalho,
      ergonomista_responsavel,
      namePlano,
      o_que_fazer,
      legislacao,
      origem_demanda,
      onde,
      porque,
      responsavel,
      quando,
      prazo,
      previsao_termino,
      termino_real,
      status,
      evidencia,
    };
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return null;
  }
}

async function mergePDFs(pdfs, output, callback) {
  const mergedPdf = await PDFDocument.create();

  for (const pdf of pdfs) {
    const pdfBytes = fs.readFileSync(pdf);
    const externalPdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(externalPdf, externalPdf.getPageIndices());

    for (const page of copiedPages) {
      if (pdf === 'landscape.pdf') {
        page.setRotation(90);
      }
      mergedPdf.addPage(page);
    }
  }

  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(output, mergedPdfBytes);
  
  callback();
}


app.post('/create-pdf', async (req, res) => {
  try {
    // Conteúdo HTML da seção retrato
    const portraitContent = `
    <div style="page-break-before: always;">
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8"/>
    <meta name="generator" content="pdf2htmlEX"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <style type="text/css">
    #sidebar{position:absolute;top:0;left:0;bottom:0;width:250px;padding:0;margin:0;overflow:auto}#page-container{position:absolute;top:0;left:0;margin:0;padding:0;border:0}@media screen{#sidebar.opened+#page-container{left:250px}#page-container{bottom:0;right:0;overflow:auto}.loading-indicator{display:none}.loading-indicator.active{display:block;position:absolute;width:64px;height:64px;top:50%;left:50%;margin-top:-32px;margin-left:-32px}.loading-indicator img{position:absolute;top:0;left:0;bottom:0;right:0}}@media print{@page{margin:0}html{margin:0}body{margin:0;-webkit-print-color-adjust:exact}#sidebar{display:none}#page-container{width:auto;height:auto;overflow:visible;background-color:transparent}.d{display:none}}.pf{position:relative;background-color:white;overflow:hidden;margin:0;border:0}.pc{position:absolute;border:0;padding:0;margin:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:block;transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0}.pc.opened{display:block}.bf{position:absolute;border:0;margin:0;top:0;bottom:0;width:100%;height:100%;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}.bi{position:absolute;border:0;margin:0;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}@media print{.pf{margin:0;box-shadow:none;page-break-after:always;page-break-inside:avoid}@-moz-document url-prefix(){.pf{overflow:visible;border:1px solid #fff}.pc{overflow:visible}}}.c{position:absolute;border:0;padding:0;margin:0;overflow:hidden;display:block}.t{position:absolute;white-space:pre;font-size:1px;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%;unicode-bidi:bidi-override;-moz-font-feature-settings:"liga" 0}.t:after{content:''}.t:before{content:'';display:inline-block}.t span{position:relative;unicode-bidi:bidi-override}._{display:inline-block;color:transparent;z-index:-1}::selection{background:rgba(127,255,255,0.4)}::-moz-selection{background:rgba(127,255,255,0.4)}.pi{display:none}.d{position:absolute;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%}.it{border:0;background-color:rgba(255,255,255,0.0)}.ir:hover{cursor:pointer}</style>
    <style type="text/css">
    @keyframes fadein{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes swing{0{transform:rotate(0)}10%{transform:rotate(0)}90%{transform:rotate(720deg)}100%{transform:rotate(720deg)}}@-webkit-keyframes swing{0{-webkit-transform:rotate(0)}10%{-webkit-transform:rotate(0)}90%{-webkit-transform:rotate(720deg)}100%{-webkit-transform:rotate(720deg)}}@media screen{#sidebar{background-color:#2f3236;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjNDAzYzNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxZTI5MmQiPjwvcGF0aD4KPC9zdmc+")}#outline{font-family:Georgia,Times,"Times New Roman",serif;font-size:13px;margin:2em 1em}#outline ul{padding:0}#outline li{list-style-type:none;margin:1em 0}#outline li>ul{margin-left:1em}#outline a,#outline a:visited,#outline a:hover,#outline a:active{line-height:1.2;color:#e8e8e8;text-overflow:ellipsis;white-space:nowrap;text-decoration:none;display:block;overflow:hidden;outline:0}#outline a:hover{color:#0cf}#page-container{background-color:#9e9e9e;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=");-webkit-transition:left 500ms;transition:left 500ms}.pf{margin:13px auto;box-shadow:1px 1px 3px 1px #333;border-collapse:separate}.pc.opened{-webkit-animation:fadein 100ms;animation:fadein 100ms}.loading-indicator.active{-webkit-animation:swing 1.5s ease-in-out .01s infinite alternate none;animation:swing 1.5s ease-in-out .01s infinite alternate none}.checked{background:no-repeat url("https://i.ibb.co/F3NzyQX/amd-26.png")}}</style>
    <style type="text/css">
    .ff0{font-family:sans-serif;visibility:hidden;}
    @font-face{font-family:ff1;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff1{font-family:ff1;line-height:1.172852;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff2;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff2{font-family:ff2;line-height:1.202148;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff3;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff3{font-family:ff3;line-height:1.202148;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff4;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff4{font-family:ff4;line-height:1.096680;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff5;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff5{font-family:ff5;line-height:1.088379;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff6;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff7{font-family:ff7;line-height:0.960449;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff8;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff8{font-family:ff8;line-height:1.374000;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff9;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff9{font-family:ff9;line-height:1.172852;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ffa;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ffa{font-family:ffa;line-height:0.983398;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ffb;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ffb{font-family:ffb;line-height:0.983398;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ffc;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ffd{font-family:ffd;line-height:1.354000;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ffe;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ffe{font-family:ffe;line-height:0.850098;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:fff;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.fff{font-family:fff;line-height:1.096680;font-style:normal;font-weight:normal;visibility:visible;}
    @font-face{font-family:ff10;src:url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')format("woff");}.ff10{font-family:ff10;line-height:0.758789;font-style:normal;font-weight:normal;visibility:visible;}
    .m1{transform:matrix(0.000000,-0.250000,0.250000,0.000000,0,0);-ms-transform:matrix(0.000000,-0.250000,0.250000,0.000000,0,0);-webkit-transform:matrix(0.000000,-0.250000,0.250000,0.000000,0,0);}
    .m0{transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);}
    .m3{transform:matrix(0.250270,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.250270,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.250270,0.000000,0.000000,0.250000,0,0);}
    .m2{transform:none;-ms-transform:none;-webkit-transform:none;}
    .v0{vertical-align:0.000000px;}
    .ls18{letter-spacing:-0.508000px;}
    .ls19{letter-spacing:-0.464000px;}
    .lsd{letter-spacing:-0.309200px;}
    .ls13{letter-spacing:-0.217569px;}
    .ls12{letter-spacing:-0.192000px;}
    .ls8{letter-spacing:-0.180000px;}
    .lsf{letter-spacing:-0.163200px;}
    .ls17{letter-spacing:-0.161200px;}
    .lsc{letter-spacing:-0.144000px;}
    .ls6{letter-spacing:-0.128800px;}
    .lse{letter-spacing:-0.109600px;}
    .lsb{letter-spacing:-0.088400px;}
    .ls4{letter-spacing:-0.048000px;}
    .ls10{letter-spacing:-0.038880px;}
    .ls16{letter-spacing:-0.028800px;}
    .ls3{letter-spacing:-0.024000px;}
    .ls11{letter-spacing:-0.012000px;}
    .ls0{letter-spacing:0.000000px;}
    .ls14{letter-spacing:0.015360px;}
    .ls2{letter-spacing:0.048000px;}
    .ls5{letter-spacing:0.050000px;}
    .ls1{letter-spacing:0.144000px;}
    .ls7{letter-spacing:0.170800px;}
    .ls15{letter-spacing:0.211200px;}
    .ls9{letter-spacing:0.216000px;}
    .lsa{letter-spacing:0.240000px;}
    .sc_{text-shadow:none;}
    .sc1{text-shadow:-0.015em 0 rgb(0,0,0),0 0.015em rgb(0,0,0),0.015em 0 rgb(0,0,0),0 -0.015em  rgb(0,0,0);}
    .sc0{text-shadow:-0.015em 0 transparent,0 0.015em transparent,0.015em 0 transparent,0 -0.015em  transparent;}
    @media screen and (-webkit-min-device-pixel-ratio:0){
    .sc_{-webkit-text-stroke:0px transparent;}
    .sc1{-webkit-text-stroke:0.015em rgb(0,0,0);text-shadow:none;}
    .sc0{-webkit-text-stroke:0.015em transparent;text-shadow:none;}
    }
    .ws0{word-spacing:0.000000px;}
    ._f{margin-left:-10.177600px;}
    ._b{margin-left:-8.574320px;}
    ._e{margin-left:-7.515520px;}
    ._c{margin-left:-6.455680px;}
    ._d{margin-left:-4.954240px;}
    ._10{margin-left:-3.597760px;}
    ._12{margin-left:-2.296320px;}
    ._0{margin-left:-1.059840px;}
    ._2{width:1.230240px;}
    ._7{width:3.107520px;}
    ._6{width:4.143360px;}
    ._9{width:5.247840px;}
    ._8{width:6.374400px;}
    ._a{width:7.415040px;}
    ._13{width:8.699520px;}
    ._20{width:9.954720px;}
    ._17{width:11.481600px;}
    ._3{width:12.868320px;}
    ._4{width:14.002880px;}
    ._16{width:15.248480px;}
    ._15{width:16.250880px;}
    ._21{width:17.523360px;}
    ._5{width:18.764640px;}
    ._1b{width:21.035840px;}
    ._1a{width:22.224000px;}
    ._14{width:23.596320px;}
    ._24{width:24.643520px;}
    ._18{width:25.864480px;}
    ._1c{width:27.648000px;}
    ._1d{width:29.028000px;}
    ._2f{width:31.382240px;}
    ._19{width:32.436000px;}
    ._22{width:35.100000px;}
    ._2e{width:39.498240px;}
    ._11{width:44.096800px;}
    ._2c{width:46.235520px;}
    ._2d{width:47.250560px;}
    ._1e{width:82.728000px;}
    ._1f{width:83.816000px;}
    ._26{width:100.776389px;}
    ._27{width:101.999096px;}
    ._28{width:111.114895px;}
    ._25{width:124.590465px;}
    ._23{width:128.124000px;}
    ._2b{width:142.048189px;}
    ._2a{width:149.222479px;}
    ._29{width:155.136015px;}
    ._1{width:744.134080px;}
    .fc9{color:rgb(17,85,204);}
    .fc8{color:rgb(58,56,56);}
    .fc3{color:transparent;}
    .fc4{color:rgb(5,99,193);}
    .fc2{color:rgb(0,32,96);}
    .fc7{color:rgb(242,242,242);}
    .fc6{color:rgb(38,38,38);}
    .fc5{color:rgb(89,89,89);}
    .fc1{color:rgb(255,255,255);}
    .fc0{color:rgb(0,0,0);}
    .fsb{font-size:8.160000px;}
    .fsc{font-size:12.000000px;}
    .fsf{font-size:19.280592px;}
    .fsd{font-size:24.000000px;}
    .fs10{font-size:26.672512px;}
    .fse{font-size:32.160000px;}
    .fs11{font-size:34.064432px;}
    .fs5{font-size:36.000000px;}
    .fs4{font-size:39.840000px;}
    .fs0{font-size:44.160000px;}
    .fs9{font-size:48.000000px;}
    .fsa{font-size:56.160000px;}
    .fs8{font-size:63.840000px;}
    .fs3{font-size:72.000000px;}
    .fs6{font-size:80.160000px;}
    .fs2{font-size:111.840000px;}
    .fs7{font-size:123.840000px;}
    .fs1{font-size:144.000000px;}
    .y0{bottom:-0.240000px;}
    .y1{bottom:0.000000px;}
    .y143{bottom:0.480000px;}
    .y13a{bottom:2.040000px;}
    .y19b{bottom:2.217617px;}
    .y165{bottom:2.280000px;}
    .y140{bottom:2.400000px;}
    .y14c{bottom:2.520000px;}
    .y1c{bottom:3.000000px;}
    .y1c5{bottom:3.020000px;}
    .ya2{bottom:3.240000px;}
    .y157{bottom:4.080000px;}
    .ya3{bottom:4.200000px;}
    .y1a2{bottom:4.450555px;}
    .y21{bottom:4.560000px;}
    .y1af{bottom:4.817071px;}
    .y13e{bottom:5.280000px;}
    .y196{bottom:6.960000px;}
    .y1be{bottom:7.022325px;}
    .y1bb{bottom:7.022329px;}
    .y1b3{bottom:7.034645px;}
    .y1b9{bottom:7.034648px;}
    .y1bf{bottom:7.037725px;}
    .y1bd{bottom:7.037729px;}
    .y1c0{bottom:7.038341px;}
    .y1b7{bottom:7.038345px;}
    .y1b1{bottom:7.040817px;}
    .y18e{bottom:7.080000px;}
    .y178{bottom:7.320000px;}
    .y19f{bottom:7.391923px;}
    .y1b2{bottom:7.404241px;}
    .y1aa{bottom:7.404243px;}
    .y1a6{bottom:7.404244px;}
    .y1a4{bottom:7.407939px;}
    .y16a{bottom:7.680000px;}
    .y7e{bottom:9.120000px;}
    .y13c{bottom:9.390000px;}
    .y7c{bottom:10.320000px;}
    .y1a8{bottom:10.361042px;}
    .y1a1{bottom:10.749087px;}
    .y1ae{bottom:11.118683px;}
    .y23{bottom:11.400000px;}
    .y17e{bottom:11.880000px;}
    .y181{bottom:12.000000px;}
    .y7a{bottom:12.120000px;}
    .y164{bottom:12.600000px;}
    .y16b{bottom:12.960000px;}
    .y74{bottom:13.680000px;}
    .y75{bottom:14.160000px;}
    .y156{bottom:14.640000px;}
    .y20{bottom:15.120000px;}
    .y1c7{bottom:15.144000px;}
    .y1b5{bottom:16.293033px;}
    .y1a{bottom:16.440000px;}
    .y1c3{bottom:16.460000px;}
    .y183{bottom:17.160000px;}
    .y69{bottom:17.400000px;}
    .y195{bottom:17.520000px;}
    .y18d{bottom:17.640000px;}
    .y177{bottom:17.880000px;}
    .y17d{bottom:22.440000px;}
    .y180{bottom:22.560000px;}
    .y179{bottom:23.160000px;}
    .y77{bottom:24.480000px;}
    .y79{bottom:24.600000px;}
    .y3{bottom:25.080000px;}
    .y1e{bottom:25.440000px;}
    .y1f{bottom:25.704000px;}
    .y22{bottom:27.144000px;}
    .y17a{bottom:27.720000px;}
    .y192{bottom:28.080000px;}
    .y18c{bottom:28.110000px;}
    .y68{bottom:30.840000px;}
    .y8d{bottom:30.960000px;}
    .y17c{bottom:33.000000px;}
    .y190{bottom:33.390000px;}
    .y4{bottom:34.344000px;}
    .y78{bottom:36.960000px;}
    .y182{bottom:38.280000px;}
    .y194{bottom:38.640000px;}
    .y18b{bottom:38.670000px;}
    .y17b{bottom:43.560000px;}
    .y186{bottom:43.950000px;}
    .y1ac{bottom:44.429142px;}
    .y193{bottom:49.200000px;}
    .y18a{bottom:49.230000px;}
    .y18f{bottom:54.510000px;}
    .y189{bottom:59.790000px;}
    .y1cc{bottom:66.384000px;}
    .y1e4{bottom:67.584000px;}
    .y1cb{bottom:67.824000px;}
    .y1cf{bottom:69.264000px;}
    .y188{bottom:70.350000px;}
    .y1f3{bottom:70.584000px;}
    .y1e3{bottom:70.704000px;}
    .yc7{bottom:73.824000px;}
    .y265{bottom:76.224000px;}
    .y171{bottom:76.944000px;}
    .y1f2{bottom:77.064000px;}
    .y1f5{bottom:77.904000px;}
    .y113{bottom:79.104000px;}
    .y89{bottom:79.704000px;}
    .y1fd{bottom:79.824000px;}
    .y187{bottom:80.910000px;}
    .y3c{bottom:82.824000px;}
    .y18{bottom:82.944000px;}
    .y1df{bottom:84.984000px;}
    .y208{bottom:85.944000px;}
    .ya0{bottom:86.544000px;}
    .ye4{bottom:87.504000px;}
    .y199{bottom:89.064000px;}
    .y1e6{bottom:90.264000px;}
    .y1ce{bottom:91.224000px;}
    .y1e2{bottom:92.664000px;}
    .y12f{bottom:93.864000px;}
    .y3b{bottom:95.424000px;}
    .y170{bottom:96.384000px;}
    .yc6{bottom:98.304000px;}
    .y5d{bottom:98.544000px;}
    .y264{bottom:98.664000px;}
    .y229{bottom:98.784000px;}
    .y1f1{bottom:99.024000px;}
    .y112{bottom:99.264000px;}
    .y1fc{bottom:99.384000px;}
    .y245{bottom:99.624000px;}
    .y1f4{bottom:99.744000px;}
    .yf5{bottom:101.060000px;}
    .y88{bottom:103.460000px;}
    .y1de{bottom:106.940000px;}
    .y207{bottom:107.900000px;}
    .y3a{bottom:108.140000px;}
    .y1ef{bottom:108.500000px;}
    .y16f{bottom:109.340000px;}
    .y1e5{bottom:109.820000px;}
    .y9f{bottom:110.420000px;}
    .y1cd{bottom:110.780000px;}
    .y1fa{bottom:111.020000px;}
    .ye3{bottom:111.380000px;}
    .y198{bottom:111.740000px;}
    .y19d{bottom:111.827418px;}
    .y1e1{bottom:112.340000px;}
    .y12e{bottom:114.020000px;}
    .y17{bottom:114.620000px;}
    .y1fb{bottom:118.220000px;}
    .y1f0{bottom:118.580000px;}
    .y111{bottom:119.420000px;}
    .y16e{bottom:120.260000px;}
    .y39{bottom:120.740000px;}
    .y5c{bottom:120.980000px;}
    .y263{bottom:121.100000px;}
    .y16d{bottom:121.820000px;}
    .y244{bottom:122.060000px;}
    .y228{bottom:122.660000px;}
    .yc5{bottom:122.780000px;}
    .y197{bottom:124.220000px;}
    .y87{bottom:127.340000px;}
    .yf4{bottom:128.420000px;}
    .y1dd{bottom:128.780000px;}
    .y206{bottom:129.740000px;}
    .y1ee{bottom:130.340000px;}
    .y1f9{bottom:132.980000px;}
    .y191{bottom:133.220000px;}
    .y38{bottom:133.460000px;}
    .y16c{bottom:133.820000px;}
    .y9e{bottom:134.180000px;}
    .ye2{bottom:135.140000px;}
    .y110{bottom:139.580000px;}
    .y5b{bottom:143.420000px;}
    .y262{bottom:143.660000px;}
    .y243{bottom:144.620000px;}
    .y169{bottom:145.820000px;}
    .y37{bottom:146.060000px;}
    .y16{bottom:146.300000px;}
    .y227{bottom:146.420000px;}
    .yc4{bottom:147.260000px;}
    .y1dc{bottom:150.740000px;}
    .y86{bottom:151.100000px;}
    .y205{bottom:151.700000px;}
    .y1ed{bottom:152.300000px;}
    .y12d{bottom:154.340000px;}
    .y1f8{bottom:154.820000px;}
    .yf3{bottom:155.780000px;}
    .y9d{bottom:158.060000px;}
    .y36{bottom:158.780000px;}
    .ye1{bottom:159.020000px;}
    .y5a{bottom:165.980000px;}
    .y261{bottom:166.100000px;}
    .y242{bottom:167.060000px;}
    .y10f{bottom:167.780000px;}
    .y168{bottom:168.500000px;}
    .y226{bottom:170.180000px;}
    .yc3{bottom:171.740000px;}
    .y1db{bottom:172.730000px;}
    .y204{bottom:173.690000px;}
    .y1ec{bottom:174.290000px;}
    .y12c{bottom:174.500000px;}
    .y85{bottom:174.860000px;}
    .y1f7{bottom:176.810000px;}
    .y15{bottom:177.980000px;}
    .y35{bottom:179.420000px;}
    .y167{bottom:180.500000px;}
    .y9c{bottom:181.820000px;}
    .ye0{bottom:182.780000px;}
    .yf2{bottom:183.140000px;}
    .y59{bottom:188.420000px;}
    .y260{bottom:188.660000px;}
    .y241{bottom:189.620000px;}
    .y166{bottom:192.620000px;}
    .y225{bottom:194.060000px;}
    .y1da{bottom:194.570000px;}
    .y12b{bottom:194.660000px;}
    .y203{bottom:195.530000px;}
    .y10e{bottom:195.860000px;}
    .y1eb{bottom:196.130000px;}
    .yc2{bottom:196.220000px;}
    .y1f6{bottom:196.370000px;}
    .y185{bottom:196.460000px;}
    .y84{bottom:198.740000px;}
    .y34{bottom:200.060000px;}
    .y163{bottom:203.900000px;}
    .y9b{bottom:205.580000px;}
    .y14{bottom:209.780000px;}
    .yf1{bottom:210.380000px;}
    .y58{bottom:210.980000px;}
    .y25f{bottom:211.100000px;}
    .y240{bottom:212.060000px;}
    .y12a{bottom:214.700000px;}
    .y10d{bottom:216.020000px;}
    .y1d9{bottom:216.530000px;}
    .y202{bottom:217.490000px;}
    .y224{bottom:217.820000px;}
    .y1ea{bottom:218.090000px;}
    .y33{bottom:220.700000px;}
    .y83{bottom:222.500000px;}
    .y161{bottom:226.250000px;}
    .y9a{bottom:229.490000px;}
    .y57{bottom:233.450000px;}
    .y25e{bottom:233.690000px;}
    .y23f{bottom:234.530000px;}
    .y129{bottom:234.890000px;}
    .y162{bottom:235.850000px;}
    .y10c{bottom:236.210000px;}
    .yf0{bottom:237.770000px;}
    .y1d8{bottom:238.370000px;}
    .ydf{bottom:239.210000px;}
    .y201{bottom:239.450000px;}
    .y1e9{bottom:240.050000px;}
    .y160{bottom:240.410000px;}
    .y32{bottom:241.370000px;}
    .y223{bottom:241.730000px;}
    .y13{bottom:244.610000px;}
    .yc1{bottom:245.210000px;}
    .y82{bottom:246.050000px;}
    .y15f{bottom:251.450000px;}
    .y25d{bottom:253.010000px;}
    .y99{bottom:253.250000px;}
    .y128{bottom:255.050000px;}
    .y56{bottom:256.010000px;}
    .y10b{bottom:256.370000px;}
    .y23e{bottom:257.090000px;}
    .yde{bottom:259.370000px;}
    .y1d7{bottom:260.330000px;}
    .y15e{bottom:260.570000px;}
    .y200{bottom:261.290000px;}
    .y1e8{bottom:261.890000px;}
    .y31{bottom:262.010000px;}
    .yef{bottom:265.130000px;}
    .y222{bottom:265.490000px;}
    .y81{bottom:268.490000px;}
    .yc0{bottom:269.690000px;}
    .y25c{bottom:272.330000px;}
    .y15d{bottom:272.570000px;}
    .y127{bottom:275.210000px;}
    .y10a{bottom:276.410000px;}
    .y98{bottom:277.130000px;}
    .y55{bottom:278.450000px;}
    .y80{bottom:279.170000px;}
    .ydd{bottom:279.530000px;}
    .y1d6{bottom:282.290000px;}
    .y1ff{bottom:283.250000px;}
    .y30{bottom:283.850000px;}
    .y15c{bottom:284.690000px;}
    .y221{bottom:289.250000px;}
    .y184{bottom:291.410000px;}
    .y25b{bottom:291.650000px;}
    .yee{bottom:292.490000px;}
    .ybf{bottom:294.170000px;}
    .y126{bottom:295.370000px;}
    .y12{bottom:296.450000px;}
    .y15b{bottom:296.690000px;}
    .y7f{bottom:299.090000px;}
    .ydc{bottom:299.690000px;}
    .y54{bottom:300.890000px;}
    .y23d{bottom:302.090000px;}
    .y1fe{bottom:302.830000px;}
    .y1e7{bottom:303.430000px;}
    .y1d5{bottom:304.150000px;}
    .y109{bottom:304.610000px;}
    .y2f{bottom:307.730000px;}
    .y15a{bottom:308.690000px;}
    .y25a{bottom:310.970000px;}
    .y220{bottom:313.130000px;}
    .y125{bottom:315.530000px;}
    .ybe{bottom:318.650000px;}
    .y7d{bottom:318.890000px;}
    .ydb{bottom:319.850000px;}
    .y159{bottom:320.810000px;}
    .y53{bottom:323.450000px;}
    .y23c{bottom:324.530000px;}
    .y97{bottom:324.650000px;}
    .y108{bottom:324.770000px;}
    .y1d4{bottom:326.110000px;}
    .y2e{bottom:330.410000px;}
    .y158{bottom:332.810000px;}
    .y124{bottom:335.570000px;}
    .y21f{bottom:336.890000px;}
    .y7b{bottom:338.690000px;}
    .ybd{bottom:343.130000px;}
    .y155{bottom:344.090000px;}
    .y107{bottom:344.930000px;}
    .y52{bottom:345.890000px;}
    .y11{bottom:346.370000px;}
    .y23b{bottom:347.090000px;}
    .yed{bottom:347.210000px;}
    .yda{bottom:347.930000px;}
    .y1d3{bottom:348.070000px;}
    .y96{bottom:348.530000px;}
    .y259{bottom:349.730000px;}
    .y17f{bottom:353.930000px;}
    .y2d{bottom:354.050000px;}
    .y123{bottom:355.730000px;}
    .y76{bottom:359.690000px;}
    .y21e{bottom:360.770000px;}
    .y106{bottom:364.970000px;}
    .y51{bottom:365.450000px;}
    .ybc{bottom:367.610000px;}
    .yd9{bottom:368.090000px;}
    .y23a{bottom:368.810000px;}
    .y258{bottom:369.050000px;}
    .y1d2{bottom:369.910000px;}
    .y154{bottom:370.370000px;}
    .y95{bottom:372.290000px;}
    .yec{bottom:374.570000px;}
    .y122{bottom:375.890000px;}
    .y271{bottom:379.490000px;}
    .y10{bottom:380.570000px;}
    .y153{bottom:384.170000px;}
    .y21d{bottom:384.530000px;}
    .y50{bottom:384.890000px;}
    .y105{bottom:385.130000px;}
    .y2c{bottom:385.610000px;}
    .yd8{bottom:388.250000px;}
    .y257{bottom:388.370000px;}
    .y239{bottom:390.770000px;}
    .y1d1{bottom:391.870000px;}
    .ybb{bottom:392.090000px;}
    .y152{bottom:395.090000px;}
    .y121{bottom:396.050000px;}
    .y94{bottom:396.170000px;}
    .yeb{bottom:401.810000px;}
    .y270{bottom:403.390000px;}
    .y4f{bottom:404.470000px;}
    .y104{bottom:405.310000px;}
    .y151{bottom:406.150000px;}
    .y73{bottom:407.350000px;}
    .y256{bottom:407.710000px;}
    .y21c{bottom:408.310000px;}
    .y1d0{bottom:411.460000px;}
    .y238{bottom:412.630000px;}
    .y150{bottom:415.270000px;}
    .y120{bottom:416.230000px;}
    .yd7{bottom:416.470000px;}
    .yba{bottom:416.590000px;}
    .y14f{bottom:416.710000px;}
    .y93{bottom:419.950000px;}
    .yf{bottom:422.710000px;}
    .y4e{bottom:423.910000px;}
    .y255{bottom:427.150000px;}
    .y14e{bottom:428.830000px;}
    .yea{bottom:429.190000px;}
    .y2b{bottom:431.470000px;}
    .y21b{bottom:432.190000px;}
    .y103{bottom:433.510000px;}
    .y237{bottom:434.590000px;}
    .y11f{bottom:436.390000px;}
    .yd6{bottom:436.510000px;}
    .y14d{bottom:440.830000px;}
    .yb9{bottom:441.070000px;}
    .y26f{bottom:441.790000px;}
    .y4d{bottom:443.350000px;}
    .y92{bottom:443.710000px;}
    .y254{bottom:446.470000px;}
    .y72{bottom:446.830000px;}
    .y14b{bottom:452.830000px;}
    .y102{bottom:453.670000px;}
    .y21a{bottom:455.950000px;}
    .y26e{bottom:456.430000px;}
    .ye9{bottom:456.550000px;}
    .yd5{bottom:456.670000px;}
    .ye{bottom:457.270000px;}
    .y4c{bottom:462.910000px;}
    .y71{bottom:463.630000px;}
    .y14a{bottom:464.950000px;}
    .yb8{bottom:465.550000px;}
    .y1ca{bottom:465.700000px;}
    .y253{bottom:465.790000px;}
    .y91{bottom:467.590000px;}
    .y26d{bottom:471.070000px;}
    .y101{bottom:473.710000px;}
    .y11e{bottom:476.590000px;}
    .yd4{bottom:476.830000px;}
    .y149{bottom:476.950000px;}
    .y2a{bottom:477.310000px;}
    .y176{bottom:478.990000px;}
    .y219{bottom:479.830000px;}
    .y4b{bottom:482.350000px;}
    .y236{bottom:483.910000px;}
    .ye8{bottom:484.870000px;}
    .y252{bottom:485.110000px;}
    .y70{bottom:486.550000px;}
    .y148{bottom:488.350000px;}
    .yb7{bottom:490.030000px;}
    .y90{bottom:490.990000px;}
    .y1c9{bottom:493.060000px;}
    .y100{bottom:493.870000px;}
    .y26c{bottom:494.950000px;}
    .y11d{bottom:496.750000px;}
    .y147{bottom:500.110000px;}
    .y146{bottom:501.550000px;}
    .y4a{bottom:501.910000px;}
    .y235{bottom:503.350000px;}
    .y218{bottom:503.590000px;}
    .y251{bottom:504.430000px;}
    .yd3{bottom:505.030000px;}
    .y1e0{bottom:508.900000px;}
    .y1c8{bottom:509.020000px;}
    .y6f{bottom:510.310000px;}
    .y145{bottom:513.670000px;}
    .yff{bottom:514.030000px;}
    .y29{bottom:515.110000px;}
    .yb6{bottom:515.470000px;}
    .y8f{bottom:515.950000px;}
    .y11c{bottom:516.910000px;}
    .y26b{bottom:518.710000px;}
    .y49{bottom:521.350000px;}
    .y1c6{bottom:522.460000px;}
    .y234{bottom:522.670000px;}
    .y175{bottom:523.150000px;}
    .y250{bottom:523.870000px;}
    .yd2{bottom:525.070000px;}
    .y144{bottom:525.670000px;}
    .y217{bottom:527.350000px;}
    .y8e{bottom:529.870000px;}
    .y6e{bottom:534.190000px;}
    .y1c2{bottom:534.460000px;}
    .y174{bottom:535.630000px;}
    .y11b{bottom:537.070000px;}
    .y141{bottom:537.790000px;}
    .y48{bottom:540.790000px;}
    .y233{bottom:541.990000px;}
    .y26a{bottom:542.470000px;}
    .y24f{bottom:543.190000px;}
    .yb5{bottom:543.790000px;}
    .y173{bottom:544.150000px;}
    .ye7{bottom:545.230000px;}
    .y19c{bottom:545.460000px;}
    .y142{bottom:547.270000px;}
    .y1c4{bottom:547.920000px;}
    .y13f{bottom:549.070000px;}
    .y216{bottom:551.230000px;}
    .yd1{bottom:553.270000px;}
    .y8c{bottom:555.790000px;}
    .y6d{bottom:556.870000px;}
    .y28{bottom:557.950000px;}
    .y47{bottom:560.350000px;}
    .y13d{bottom:561.070000px;}
    .y1b6{bottom:561.378446px;}
    .y1a3{bottom:561.378489px;}
    .y1ab{bottom:561.378493px;}
    .yfe{bottom:562.270000px;}
    .y24e{bottom:562.510000px;}
    .yb4{bottom:563.950000px;}
    .y11a{bottom:565.150000px;}
    .ye6{bottom:565.390000px;}
    .y269{bottom:566.350000px;}
    .y232{bottom:569.230000px;}
    .y13b{bottom:572.350000px;}
    .yd0{bottom:573.430000px;}
    .y215{bottom:574.990000px;}
    .y8b{bottom:578.350000px;}
    .y6c{bottom:578.830000px;}
    .y46{bottom:579.790000px;}
    .y1bc{bottom:579.889662px;}
    .y1a0{bottom:579.889705px;}
    .y24d{bottom:581.860000px;}
    .yfd{bottom:582.460000px;}
    .yb3{bottom:584.020000px;}
    .y231{bottom:588.700000px;}
    .y268{bottom:589.060000px;}
    .yab{bottom:589.300000px;}
    .y67{bottom:589.900000px;}
    .y119{bottom:593.380000px;}
    .ycf{bottom:593.620000px;}
    .y27{bottom:594.700000px;}
    .y1ba{bottom:598.415662px;}
    .y19e{bottom:598.415705px;}
    .y139{bottom:598.660000px;}
    .y214{bottom:598.900000px;}
    .y45{bottom:599.380000px;}
    .y24c{bottom:601.180000px;}
    .yfc{bottom:602.620000px;}
    .yaa{bottom:603.220000px;}
    .y6b{bottom:603.820000px;}
    .yb2{bottom:604.180000px;}
    .y267{bottom:611.020000px;}
    .y138{bottom:612.580000px;}
    .y118{bottom:613.540000px;}
    .ye5{bottom:613.660000px;}
    .y230{bottom:615.940000px;}
    .y1b8{bottom:616.927494px;}
    .y1a9{bottom:616.927537px;}
    .y6a{bottom:617.740000px;}
    .y44{bottom:618.820000px;}
    .y24b{bottom:620.620000px;}
    .yce{bottom:621.700000px;}
    .yfb{bottom:622.780000px;}
    .y137{bottom:623.380000px;}
    .yb1{bottom:624.340000px;}
    .y213{bottom:626.980000px;}
    .yd{bottom:629.500000px;}
    .ya9{bottom:630.580000px;}
    .y5{bottom:631.420000px;}
    .y136{bottom:634.420000px;}
    .y1a5{bottom:635.438094px;}
    .y1ad{bottom:635.438137px;}
    .y43{bottom:638.380000px;}
    .y24a{bottom:639.940000px;}
    .y117{bottom:641.620000px;}
    .ycd{bottom:641.860000px;}
    .y22f{bottom:643.300000px;}
    .y66{bottom:643.780000px;}
    .ya8{bottom:644.500000px;}
    .y135{bottom:645.100000px;}
    .y212{bottom:646.540000px;}
    .y26{bottom:646.660000px;}
    .yfa{bottom:650.860000px;}
    .y65{bottom:654.700000px;}
    .y1b4{bottom:654.700206px;}
    .y1c1{bottom:654.700249px;}
    .y42{bottom:657.820000px;}
    .ya7{bottom:658.420000px;}
    .y249{bottom:659.260000px;}
    .ycc{bottom:662.020000px;}
    .y22e{bottom:662.740000px;}
    .y134{bottom:663.220000px;}
    .yb0{bottom:664.660000px;}
    .y19a{bottom:664.697778px;}
    .y211{bottom:665.860000px;}
    .y64{bottom:668.620000px;}
    .y116{bottom:669.820000px;}
    .yf9{bottom:671.020000px;}
    .ya6{bottom:672.340000px;}
    .y1b0{bottom:673.210826px;}
    .yc{bottom:674.860000px;}
    .y41{bottom:677.260000px;}
    .y248{bottom:678.580000px;}
    .y22d{bottom:682.060000px;}
    .ycb{bottom:682.180000px;}
    .y63{bottom:682.540000px;}
    .y133{bottom:683.380000px;}
    .yaf{bottom:684.820000px;}
    .y266{bottom:685.060000px;}
    .y210{bottom:685.180000px;}
    .ya5{bottom:686.260000px;}
    .yb{bottom:696.220000px;}
    .y62{bottom:696.460000px;}
    .y40{bottom:696.820000px;}
    .y115{bottom:697.900000px;}
    .y25{bottom:698.620000px;}
    .yf8{bottom:699.220000px;}
    .ya4{bottom:700.180000px;}
    .y22c{bottom:701.500000px;}
    .yca{bottom:702.340000px;}
    .y132{bottom:703.540000px;}
    .y20f{bottom:704.500000px;}
    .yae{bottom:704.860000px;}
    .y1a7{bottom:706.554526px;}
    .y6{bottom:709.540000px;}
    .y61{bottom:710.380000px;}
    .ya1{bottom:715.300000px;}
    .y3f{bottom:716.260000px;}
    .y247{bottom:717.340000px;}
    .ya{bottom:717.700000px;}
    .yf7{bottom:719.380000px;}
    .y22b{bottom:720.820000px;}
    .yc9{bottom:722.380000px;}
    .y131{bottom:723.700000px;}
    .y20e{bottom:723.820000px;}
    .y60{bottom:724.300000px;}
    .yad{bottom:725.020000px;}
    .y114{bottom:726.100000px;}
    .y3e{bottom:735.820000px;}
    .y172{bottom:736.780000px;}
    .y130{bottom:737.380000px;}
    .y8a{bottom:738.340000px;}
    .y9{bottom:739.180000px;}
    .y246{bottom:739.780000px;}
    .yc8{bottom:742.900000px;}
    .yf6{bottom:743.020000px;}
    .y20d{bottom:744.340000px;}
    .y22a{bottom:744.460000px;}
    .yac{bottom:745.900000px;}
    .y5f{bottom:746.860000px;}
    .y24{bottom:747.460000px;}
    .y3d{bottom:751.300000px;}
    .y5e{bottom:754.180000px;}
    .y20c{bottom:755.620000px;}
    .y7{bottom:757.080000px;}
    .y8{bottom:760.560000px;}
    .y1d{bottom:767.640000px;}
    .y20b{bottom:769.080000px;}
    .y19{bottom:779.640000px;}
    .y209{bottom:781.080000px;}
    .y1b{bottom:793.080000px;}
    .y20a{bottom:794.520000px;}
    .y2{bottom:796.080000px;}
    .h39{height:0.719970px;}
    .h2f{height:0.720000px;}
    .h34{height:0.960020px;}
    .h2c{height:1.080000px;}
    .h35{height:7.080000px;}
    .h16{height:7.100156px;}
    .h31{height:8.040000px;}
    .h3f{height:8.146566px;}
    .h2d{height:8.760000px;}
    .h30{height:10.440000px;}
    .h21{height:10.441406px;}
    .h29{height:10.560000px;}
    .h2b{height:11.280000px;}
    .h2e{height:11.400000px;}
    .h1e{height:13.320000px;}
    .h8{height:13.440000px;}
    .h52{height:13.464000px;}
    .h1f{height:14.640000px;}
    .h4c{height:18.141005px;}
    .h43{height:18.141007px;}
    .h4e{height:18.141010px;}
    .h4a{height:18.156427px;}
    .h4b{height:18.895597px;}
    .h49{height:18.895599px;}
    .h44{height:18.895602px;}
    .h40{height:19.177034px;}
    .h1d{height:19.560000px;}
    .h1c{height:20.760000px;}
    .h38{height:21.120000px;}
    .h36{height:21.144000px;}
    .h37{height:21.840000px;}
    .h23{height:23.871094px;}
    .h32{height:25.080000px;}
    .h2a{height:25.104000px;}
    .h45{height:26.287570px;}
    .h42{height:26.529251px;}
    .h19{height:26.760000px;}
    .h7{height:26.880000px;}
    .h51{height:26.904000px;}
    .h48{height:27.310673px;}
    .h33{height:27.982969px;}
    .hd{height:31.324219px;}
    .hc{height:31.605469px;}
    .h3a{height:31.680000px;}
    .h13{height:34.665469px;}
    .h46{height:34.879450px;}
    .h12{height:34.976719px;}
    .h24{height:35.535000px;}
    .h22{height:35.806641px;}
    .h4d{height:36.667017px;}
    .ha{height:36.744000px;}
    .h28{height:36.861328px;}
    .h26{height:37.216875px;}
    .h18{height:38.424375px;}
    .h15{height:38.769375px;}
    .hb{height:39.626016px;}
    .h17{height:41.280000px;}
    .h1b{height:42.828000px;}
    .h2{height:43.922812px;}
    .h9{height:45.216562px;}
    .h25{height:47.251200px;}
    .h1a{height:47.424000px;}
    .h27{height:47.472000px;}
    .h11{height:47.742188px;}
    .h20{height:49.148438px;}
    .h14{height:53.472656px;}
    .h3b{height:62.040000px;}
    .h3c{height:62.064000px;}
    .h3e{height:62.760000px;}
    .h10{height:65.367422px;}
    .h6{height:73.722656px;}
    .he{height:82.077891px;}
    .h47{height:92.953404px;}
    .h3d{height:94.464000px;}
    .h5{height:114.515859px;}
    .hf{height:126.802969px;}
    .h4{height:147.445313px;}
    .h41{height:187.380552px;}
    .h4f{height:595.320000px;}
    .h50{height:595.680000px;}
    .h3{height:791.640000px;}
    .h0{height:841.920000px;}
    .h1{height:842.160000px;}
    .w39{width:8.509889px;}
    .w25{width:9.240000px;}
    .w2c{width:10.200000px;}
    .w2d{width:10.320000px;}
    .wa{width:28.320000px;}
    .w4b{width:28.440000px;}
    .w34{width:30.000441px;}
    .w13{width:31.680000px;}
    .w23{width:37.704000px;}
    .w44{width:41.520000px;}
    .w29{width:42.504000px;}
    .w3{width:46.920000px;}
    .w1e{width:48.984000px;}
    .we{width:49.104000px;}
    .w35{width:58.875480px;}
    .w14{width:63.600000px;}
    .w15{width:67.104000px;}
    .w26{width:69.240000px;}
    .w37{width:69.978420px;}
    .w19{width:70.464000px;}
    .w2f{width:70.944000px;}
    .w2e{width:73.704000px;}
    .w11{width:77.544000px;}
    .w20{width:84.144000px;}
    .w10{width:84.480000px;}
    .wb{width:87.360000px;}
    .w4{width:91.104000px;}
    .w45{width:91.224000px;}
    .w1b{width:91.440000px;}
    .w16{width:91.944000px;}
    .w8{width:99.120000px;}
    .w31{width:104.880000px;}
    .w18{width:105.600000px;}
    .w3b{width:109.228739px;}
    .w3a{width:118.120956px;}
    .w21{width:139.700000px;}
    .w1d{width:143.060000px;}
    .w42{width:145.320000px;}
    .wd{width:146.900000px;}
    .w3f{width:147.600000px;}
    .w2a{width:148.460000px;}
    .w6{width:155.420000px;}
    .w47{width:155.540000px;}
    .wf{width:174.740000px;}
    .w1f{width:174.860000px;}
    .w17{width:209.060000px;}
    .w38{width:210.681412px;}
    .w30{width:243.050000px;}
    .w7{width:255.170000px;}
    .w48{width:262.250000px;}
    .w4a{width:269.330000px;}
    .w40{width:275.930000px;}
    .w1a{width:282.770000px;}
    .w12{width:296.930000px;}
    .w2b{width:301.610000px;}
    .w49{width:340.270000px;}
    .w9{width:340.390000px;}
    .w1c{width:367.870000px;}
    .wc{width:371.710000px;}
    .w27{width:386.110000px;}
    .w5{width:410.590000px;}
    .w46{width:417.790000px;}
    .w3e{width:423.530000px;}
    .w24{width:455.350000px;}
    .w28{width:492.580000px;}
    .w22{width:493.060000px;}
    .w43{width:498.430000px;}
    .w36{width:502.453430px;}
    .w32{width:502.823425px;}
    .w33{width:502.823428px;}
    .w2{width:595.319991px;}
    .w0{width:595.320000px;}
    .w1{width:595.680000px;}
    .w41{width:841.919987px;}
    .w3c{width:841.920000px;}
    .w3d{width:842.160000px;}
    .x0{left:0.000000px;}
    .x5e{left:1.109986px;}
    .x43{left:3.240000px;}
    .x2b{left:4.320000px;}
    .xc{left:5.400000px;}
    .xe{left:7.320000px;}
    .x4e{left:8.760000px;}
    .x26{left:9.840000px;}
    .x29{left:11.880000px;}
    .x13{left:13.440000px;}
    .x50{left:14.640000px;}
    .x2c{left:15.840000px;}
    .x57{left:18.120000px;}
    .x24{left:19.440000px;}
    .x5c{left:21.478219px;}
    .x54{left:22.560000px;}
    .x27{left:24.270000px;}
    .x56{left:25.344000px;}
    .x2{left:28.440000px;}
    .x55{left:30.480000px;}
    .x2d{left:31.680000px;}
    .x3{left:34.440000px;}
    .x53{left:40.440000px;}
    .x2e{left:45.840000px;}
    .x1{left:49.679991px;}
    .x58{left:51.519993px;}
    .x10{left:63.864000px;}
    .x1b{left:68.064000px;}
    .x22{left:69.264000px;}
    .x30{left:71.184000px;}
    .x6d{left:74.784000px;}
    .x36{left:78.023991px;}
    .x3f{left:85.103991px;}
    .x11{left:87.716000px;}
    .x4{left:92.303991px;}
    .x39{left:95.543991px;}
    .x23{left:101.180000px;}
    .x7{left:103.459991px;}
    .x8{left:106.579991px;}
    .x49{left:109.100000px;}
    .x62{left:110.876000px;}
    .x3a{left:113.539991px;}
    .x47{left:118.940000px;}
    .x3c{left:120.499991px;}
    .x3d{left:121.699991px;}
    .x4f{left:124.340000px;}
    .x59{left:126.260849px;}
    .x5a{left:128.850816px;}
    .x15{left:132.619991px;}
    .x44{left:134.930000px;}
    .x41{left:138.650000px;}
    .xd{left:142.340000px;}
    .x1f{left:152.660000px;}
    .x1c{left:156.020000px;}
    .x45{left:157.100000px;}
    .x4a{left:160.610000px;}
    .x12{left:162.980000px;}
    .x25{left:164.900000px;}
    .x4c{left:168.619991px;}
    .x60{left:170.900000px;}
    .x40{left:172.250000px;}
    .x6e{left:173.900000px;}
    .x19{left:177.259991px;}
    .x3e{left:180.979991px;}
    .x16{left:183.619991px;}
    .x5d{left:191.429330px;}
    .x51{left:195.770000px;}
    .x46{left:199.130000px;}
    .x35{left:204.169991px;}
    .xb{left:208.369991px;}
    .x72{left:219.409991px;}
    .x2f{left:224.209991px;}
    .x20{left:230.690000px;}
    .x28{left:232.250000px;}
    .x21{left:236.089991px;}
    .x48{left:241.130000px;}
    .x73{left:247.129991px;}
    .x31{left:248.210000px;}
    .x38{left:264.169991px;}
    .x71{left:268.009991px;}
    .x3b{left:271.009991px;}
    .x17{left:273.289991px;}
    .x1a{left:277.969991px;}
    .x18{left:282.289991px;}
    .x70{left:290.690000px;}
    .xf{left:297.770000px;}
    .x4b{left:301.249991px;}
    .x1d{left:303.410000px;}
    .x9{left:304.849991px;}
    .x32{left:306.890000px;}
    .x6{left:311.949991px;}
    .xa{left:315.549991px;}
    .x2a{left:324.310000px;}
    .x64{left:328.009987px;}
    .x1e{left:352.990000px;}
    .x33{left:356.350000px;}
    .x34{left:391.510000px;}
    .x74{left:408.909991px;}
    .x61{left:411.170000px;}
    .x68{left:418.249987px;}
    .x5f{left:435.852467px;}
    .x52{left:439.300000px;}
    .x5{left:485.979991px;}
    .x5b{left:495.094859px;}
    .x14{left:503.380000px;}
    .x6f{left:514.180000px;}
    .x42{left:543.460000px;}
    .x37{left:553.059991px;}
    .x4d{left:555.219991px;}
    .x66{left:728.860000px;}
    .x63{left:739.780000px;}
    .x67{left:796.559987px;}
    .x6a{left:800.879987px;}
    .x6c{left:805.319987px;}
    .x69{left:811.919987px;}
    .x6b{left:813.239987px;}
    .x65{left:814.919987px;}
    @media print{
    .v0{vertical-align:0.000000pt;}
    .ls18{letter-spacing:-0.677333pt;}
    .ls19{letter-spacing:-0.618667pt;}
    .lsd{letter-spacing:-0.412267pt;}
    .ls13{letter-spacing:-0.290092pt;}
    .ls12{letter-spacing:-0.256000pt;}
    .ls8{letter-spacing:-0.240000pt;}
    .lsf{letter-spacing:-0.217600pt;}
    .ls17{letter-spacing:-0.214933pt;}
    .lsc{letter-spacing:-0.192000pt;}
    .ls6{letter-spacing:-0.171733pt;}
    .lse{letter-spacing:-0.146133pt;}
    .lsb{letter-spacing:-0.117867pt;}
    .ls4{letter-spacing:-0.064000pt;}
    .ls10{letter-spacing:-0.051840pt;}
    .ls16{letter-spacing:-0.038400pt;}
    .ls3{letter-spacing:-0.032000pt;}
    .ls11{letter-spacing:-0.016000pt;}
    .ls0{letter-spacing:0.000000pt;}
    .ls14{letter-spacing:0.020480pt;}
    .ls2{letter-spacing:0.064000pt;}
    .ls5{letter-spacing:0.066667pt;}
    .ls1{letter-spacing:0.192000pt;}
    .ls7{letter-spacing:0.227733pt;}
    .ls15{letter-spacing:0.281600pt;}
    .ls9{letter-spacing:0.288000pt;}
    .lsa{letter-spacing:0.320000pt;}
    .ws0{word-spacing:0.000000pt;}
    ._f{margin-left:-13.570133pt;}
    ._b{margin-left:-11.432427pt;}
    ._e{margin-left:-10.020693pt;}
    ._c{margin-left:-8.607573pt;}
    ._d{margin-left:-6.605653pt;}
    ._10{margin-left:-4.797013pt;}
    ._12{margin-left:-3.061760pt;}
    ._0{margin-left:-1.413120pt;}
    ._2{width:1.640320pt;}
    ._7{width:4.143360pt;}
    ._6{width:5.524480pt;}
    ._9{width:6.997120pt;}
    ._8{width:8.499200pt;}
    ._a{width:9.886720pt;}
    ._13{width:11.599360pt;}
    ._20{width:13.272960pt;}
    ._17{width:15.308800pt;}
    ._3{width:17.157760pt;}
    ._4{width:18.670507pt;}
    ._16{width:20.331307pt;}
    ._15{width:21.667840pt;}
    ._21{width:23.364480pt;}
    ._5{width:25.019520pt;}
    ._1b{width:28.047787pt;}
    ._1a{width:29.632000pt;}
    ._14{width:31.461760pt;}
    ._24{width:32.858027pt;}
    ._18{width:34.485973pt;}
    ._1c{width:36.864000pt;}
    ._1d{width:38.704000pt;}
    ._2f{width:41.842987pt;}
    ._19{width:43.248000pt;}
    ._22{width:46.800000pt;}
    ._2e{width:52.664320pt;}
    ._11{width:58.795733pt;}
    ._2c{width:61.647360pt;}
    ._2d{width:63.000747pt;}
    ._1e{width:110.304000pt;}
    ._1f{width:111.754667pt;}
    ._26{width:134.368518pt;}
    ._27{width:135.998794pt;}
    ._28{width:148.153193pt;}
    ._25{width:166.120620pt;}
    ._23{width:170.832000pt;}
    ._2b{width:189.397586pt;}
    ._2a{width:198.963305pt;}
    ._29{width:206.848020pt;}
    ._1{width:992.178773pt;}
    .fsb{font-size:10.880000pt;}
    .fsc{font-size:16.000000pt;}
    .fsf{font-size:25.707456pt;}
    .fsd{font-size:32.000000pt;}
    .fs10{font-size:35.563349pt;}
    .fse{font-size:42.880000pt;}
    .fs11{font-size:45.419243pt;}
    .fs5{font-size:48.000000pt;}
    .fs4{font-size:53.120000pt;}
    .fs0{font-size:58.880000pt;}
    .fs9{font-size:64.000000pt;}
    .fsa{font-size:74.880000pt;}
    .fs8{font-size:85.120000pt;}
    .fs3{font-size:96.000000pt;}
    .fs6{font-size:106.880000pt;}
    .fs2{font-size:149.120000pt;}
    .fs7{font-size:165.120000pt;}
    .fs1{font-size:192.000000pt;}
    .y0{bottom:-0.320000pt;}
    .y1{bottom:0.000000pt;}
    .y143{bottom:0.640000pt;}
    .y13a{bottom:2.720000pt;}
    .y19b{bottom:2.956822pt;}
    .y165{bottom:3.040000pt;}
    .y140{bottom:3.200000pt;}
    .y14c{bottom:3.360000pt;}
    .y1c{bottom:4.000000pt;}
    .y1c5{bottom:4.026667pt;}
    .ya2{bottom:4.320000pt;}
    .y157{bottom:5.440000pt;}
    .ya3{bottom:5.600000pt;}
    .y1a2{bottom:5.934073pt;}
    .y21{bottom:6.080000pt;}
    .y1af{bottom:6.422761pt;}
    .y13e{bottom:7.040000pt;}
    .y196{bottom:9.280000pt;}
    .y1be{bottom:9.363100pt;}
    .y1bb{bottom:9.363105pt;}
    .y1b3{bottom:9.379526pt;}
    .y1b9{bottom:9.379531pt;}
    .y1bf{bottom:9.383633pt;}
    .y1bd{bottom:9.383638pt;}
    .y1c0{bottom:9.384454pt;}
    .y1b7{bottom:9.384460pt;}
    .y1b1{bottom:9.387756pt;}
    .y18e{bottom:9.440000pt;}
    .y178{bottom:9.760000pt;}
    .y19f{bottom:9.855897pt;}
    .y1b2{bottom:9.872321pt;}
    .y1aa{bottom:9.872324pt;}
    .y1a6{bottom:9.872325pt;}
    .y1a4{bottom:9.877252pt;}
    .y16a{bottom:10.240000pt;}
    .y7e{bottom:12.160000pt;}
    .y13c{bottom:12.520000pt;}
    .y7c{bottom:13.760000pt;}
    .y1a8{bottom:13.814722pt;}
    .y1a1{bottom:14.332115pt;}
    .y1ae{bottom:14.824910pt;}
    .y23{bottom:15.200000pt;}
    .y17e{bottom:15.840000pt;}
    .y181{bottom:16.000000pt;}
    .y7a{bottom:16.160000pt;}
    .y164{bottom:16.800000pt;}
    .y16b{bottom:17.280000pt;}
    .y74{bottom:18.240000pt;}
    .y75{bottom:18.880000pt;}
    .y156{bottom:19.520000pt;}
    .y20{bottom:20.160000pt;}
    .y1c7{bottom:20.192000pt;}
    .y1b5{bottom:21.724044pt;}
    .y1a{bottom:21.920000pt;}
    .y1c3{bottom:21.946667pt;}
    .y183{bottom:22.880000pt;}
    .y69{bottom:23.200000pt;}
    .y195{bottom:23.360000pt;}
    .y18d{bottom:23.520000pt;}
    .y177{bottom:23.840000pt;}
    .y17d{bottom:29.920000pt;}
    .y180{bottom:30.080000pt;}
    .y179{bottom:30.880000pt;}
    .y77{bottom:32.640000pt;}
    .y79{bottom:32.800000pt;}
    .y3{bottom:33.440000pt;}
    .y1e{bottom:33.920000pt;}
    .y1f{bottom:34.272000pt;}
    .y22{bottom:36.192000pt;}
    .y17a{bottom:36.960000pt;}
    .y192{bottom:37.440000pt;}
    .y18c{bottom:37.480000pt;}
    .y68{bottom:41.120000pt;}
    .y8d{bottom:41.280000pt;}
    .y17c{bottom:44.000000pt;}
    .y190{bottom:44.520000pt;}
    .y4{bottom:45.792000pt;}
    .y78{bottom:49.280000pt;}
    .y182{bottom:51.040000pt;}
    .y194{bottom:51.520000pt;}
    .y18b{bottom:51.560000pt;}
    .y17b{bottom:58.080000pt;}
    .y186{bottom:58.600000pt;}
    .y1ac{bottom:59.238857pt;}
    .y193{bottom:65.600000pt;}
    .y18a{bottom:65.640000pt;}
    .y18f{bottom:72.680000pt;}
    .y189{bottom:79.720000pt;}
    .y1cc{bottom:88.512000pt;}
    .y1e4{bottom:90.112000pt;}
    .y1cb{bottom:90.432000pt;}
    .y1cf{bottom:92.352000pt;}
    .y188{bottom:93.800000pt;}
    .y1f3{bottom:94.112000pt;}
    .y1e3{bottom:94.272000pt;}
    .yc7{bottom:98.432000pt;}
    .y265{bottom:101.632000pt;}
    .y171{bottom:102.592000pt;}
    .y1f2{bottom:102.752000pt;}
    .y1f5{bottom:103.872000pt;}
    .y113{bottom:105.472000pt;}
    .y89{bottom:106.272000pt;}
    .y1fd{bottom:106.432000pt;}
    .y187{bottom:107.880000pt;}
    .y3c{bottom:110.432000pt;}
    .y18{bottom:110.592000pt;}
    .y1df{bottom:113.312000pt;}
    .y208{bottom:114.592000pt;}
    .ya0{bottom:115.392000pt;}
    .ye4{bottom:116.672000pt;}
    .y199{bottom:118.752000pt;}
    .y1e6{bottom:120.352000pt;}
    .y1ce{bottom:121.632000pt;}
    .y1e2{bottom:123.552000pt;}
    .y12f{bottom:125.152000pt;}
    .y3b{bottom:127.232000pt;}
    .y170{bottom:128.512000pt;}
    .yc6{bottom:131.072000pt;}
    .y5d{bottom:131.392000pt;}
    .y264{bottom:131.552000pt;}
    .y229{bottom:131.712000pt;}
    .y1f1{bottom:132.032000pt;}
    .y112{bottom:132.352000pt;}
    .y1fc{bottom:132.512000pt;}
    .y245{bottom:132.832000pt;}
    .y1f4{bottom:132.992000pt;}
    .yf5{bottom:134.746667pt;}
    .y88{bottom:137.946667pt;}
    .y1de{bottom:142.586667pt;}
    .y207{bottom:143.866667pt;}
    .y3a{bottom:144.186667pt;}
    .y1ef{bottom:144.666667pt;}
    .y16f{bottom:145.786667pt;}
    .y1e5{bottom:146.426667pt;}
    .y9f{bottom:147.226667pt;}
    .y1cd{bottom:147.706667pt;}
    .y1fa{bottom:148.026667pt;}
    .ye3{bottom:148.506667pt;}
    .y198{bottom:148.986667pt;}
    .y19d{bottom:149.103225pt;}
    .y1e1{bottom:149.786667pt;}
    .y12e{bottom:152.026667pt;}
    .y17{bottom:152.826667pt;}
    .y1fb{bottom:157.626667pt;}
    .y1f0{bottom:158.106667pt;}
    .y111{bottom:159.226667pt;}
    .y16e{bottom:160.346667pt;}
    .y39{bottom:160.986667pt;}
    .y5c{bottom:161.306667pt;}
    .y263{bottom:161.466667pt;}
    .y16d{bottom:162.426667pt;}
    .y244{bottom:162.746667pt;}
    .y228{bottom:163.546667pt;}
    .yc5{bottom:163.706667pt;}
    .y197{bottom:165.626667pt;}
    .y87{bottom:169.786667pt;}
    .yf4{bottom:171.226667pt;}
    .y1dd{bottom:171.706667pt;}
    .y206{bottom:172.986667pt;}
    .y1ee{bottom:173.786667pt;}
    .y1f9{bottom:177.306667pt;}
    .y191{bottom:177.626667pt;}
    .y38{bottom:177.946667pt;}
    .y16c{bottom:178.426667pt;}
    .y9e{bottom:178.906667pt;}
    .ye2{bottom:180.186667pt;}
    .y110{bottom:186.106667pt;}
    .y5b{bottom:191.226667pt;}
    .y262{bottom:191.546667pt;}
    .y243{bottom:192.826667pt;}
    .y169{bottom:194.426667pt;}
    .y37{bottom:194.746667pt;}
    .y16{bottom:195.066667pt;}
    .y227{bottom:195.226667pt;}
    .yc4{bottom:196.346667pt;}
    .y1dc{bottom:200.986667pt;}
    .y86{bottom:201.466667pt;}
    .y205{bottom:202.266667pt;}
    .y1ed{bottom:203.066667pt;}
    .y12d{bottom:205.786667pt;}
    .y1f8{bottom:206.426667pt;}
    .yf3{bottom:207.706667pt;}
    .y9d{bottom:210.746667pt;}
    .y36{bottom:211.706667pt;}
    .ye1{bottom:212.026667pt;}
    .y5a{bottom:221.306667pt;}
    .y261{bottom:221.466667pt;}
    .y242{bottom:222.746667pt;}
    .y10f{bottom:223.706667pt;}
    .y168{bottom:224.666667pt;}
    .y226{bottom:226.906667pt;}
    .yc3{bottom:228.986667pt;}
    .y1db{bottom:230.306667pt;}
    .y204{bottom:231.586667pt;}
    .y1ec{bottom:232.386667pt;}
    .y12c{bottom:232.666667pt;}
    .y85{bottom:233.146667pt;}
    .y1f7{bottom:235.746667pt;}
    .y15{bottom:237.306667pt;}
    .y35{bottom:239.226667pt;}
    .y167{bottom:240.666667pt;}
    .y9c{bottom:242.426667pt;}
    .ye0{bottom:243.706667pt;}
    .yf2{bottom:244.186667pt;}
    .y59{bottom:251.226667pt;}
    .y260{bottom:251.546667pt;}
    .y241{bottom:252.826667pt;}
    .y166{bottom:256.826667pt;}
    .y225{bottom:258.746667pt;}
    .y1da{bottom:259.426667pt;}
    .y12b{bottom:259.546667pt;}
    .y203{bottom:260.706667pt;}
    .y10e{bottom:261.146667pt;}
    .y1eb{bottom:261.506667pt;}
    .yc2{bottom:261.626667pt;}
    .y1f6{bottom:261.826667pt;}
    .y185{bottom:261.946667pt;}
    .y84{bottom:264.986667pt;}
    .y34{bottom:266.746667pt;}
    .y163{bottom:271.866667pt;}
    .y9b{bottom:274.106667pt;}
    .y14{bottom:279.706667pt;}
    .yf1{bottom:280.506667pt;}
    .y58{bottom:281.306667pt;}
    .y25f{bottom:281.466667pt;}
    .y240{bottom:282.746667pt;}
    .y12a{bottom:286.266667pt;}
    .y10d{bottom:288.026667pt;}
    .y1d9{bottom:288.706667pt;}
    .y202{bottom:289.986667pt;}
    .y224{bottom:290.426667pt;}
    .y1ea{bottom:290.786667pt;}
    .y33{bottom:294.266667pt;}
    .y83{bottom:296.666667pt;}
    .y161{bottom:301.666667pt;}
    .y9a{bottom:305.986667pt;}
    .y57{bottom:311.266667pt;}
    .y25e{bottom:311.586667pt;}
    .y23f{bottom:312.706667pt;}
    .y129{bottom:313.186667pt;}
    .y162{bottom:314.466667pt;}
    .y10c{bottom:314.946667pt;}
    .yf0{bottom:317.026667pt;}
    .y1d8{bottom:317.826667pt;}
    .ydf{bottom:318.946667pt;}
    .y201{bottom:319.266667pt;}
    .y1e9{bottom:320.066667pt;}
    .y160{bottom:320.546667pt;}
    .y32{bottom:321.826667pt;}
    .y223{bottom:322.306667pt;}
    .y13{bottom:326.146667pt;}
    .yc1{bottom:326.946667pt;}
    .y82{bottom:328.066667pt;}
    .y15f{bottom:335.266667pt;}
    .y25d{bottom:337.346667pt;}
    .y99{bottom:337.666667pt;}
    .y128{bottom:340.066667pt;}
    .y56{bottom:341.346667pt;}
    .y10b{bottom:341.826667pt;}
    .y23e{bottom:342.786667pt;}
    .yde{bottom:345.826667pt;}
    .y1d7{bottom:347.106667pt;}
    .y15e{bottom:347.426667pt;}
    .y200{bottom:348.386667pt;}
    .y1e8{bottom:349.186667pt;}
    .y31{bottom:349.346667pt;}
    .yef{bottom:353.506667pt;}
    .y222{bottom:353.986667pt;}
    .y81{bottom:357.986667pt;}
    .yc0{bottom:359.586667pt;}
    .y25c{bottom:363.106667pt;}
    .y15d{bottom:363.426667pt;}
    .y127{bottom:366.946667pt;}
    .y10a{bottom:368.546667pt;}
    .y98{bottom:369.506667pt;}
    .y55{bottom:371.266667pt;}
    .y80{bottom:372.226667pt;}
    .ydd{bottom:372.706667pt;}
    .y1d6{bottom:376.386667pt;}
    .y1ff{bottom:377.666667pt;}
    .y30{bottom:378.466667pt;}
    .y15c{bottom:379.586667pt;}
    .y221{bottom:385.666667pt;}
    .y184{bottom:388.546667pt;}
    .y25b{bottom:388.866667pt;}
    .yee{bottom:389.986667pt;}
    .ybf{bottom:392.226667pt;}
    .y126{bottom:393.826667pt;}
    .y12{bottom:395.266667pt;}
    .y15b{bottom:395.586667pt;}
    .y7f{bottom:398.786667pt;}
    .ydc{bottom:399.586667pt;}
    .y54{bottom:401.186667pt;}
    .y23d{bottom:402.786667pt;}
    .y1fe{bottom:403.773333pt;}
    .y1e7{bottom:404.573333pt;}
    .y1d5{bottom:405.533333pt;}
    .y109{bottom:406.146667pt;}
    .y2f{bottom:410.306667pt;}
    .y15a{bottom:411.586667pt;}
    .y25a{bottom:414.626667pt;}
    .y220{bottom:417.506667pt;}
    .y125{bottom:420.706667pt;}
    .ybe{bottom:424.866667pt;}
    .y7d{bottom:425.186667pt;}
    .ydb{bottom:426.466667pt;}
    .y159{bottom:427.746667pt;}
    .y53{bottom:431.266667pt;}
    .y23c{bottom:432.706667pt;}
    .y97{bottom:432.866667pt;}
    .y108{bottom:433.026667pt;}
    .y1d4{bottom:434.813333pt;}
    .y2e{bottom:440.546667pt;}
    .y158{bottom:443.746667pt;}
    .y124{bottom:447.426667pt;}
    .y21f{bottom:449.186667pt;}
    .y7b{bottom:451.586667pt;}
    .ybd{bottom:457.506667pt;}
    .y155{bottom:458.786667pt;}
    .y107{bottom:459.906667pt;}
    .y52{bottom:461.186667pt;}
    .y11{bottom:461.826667pt;}
    .y23b{bottom:462.786667pt;}
    .yed{bottom:462.946667pt;}
    .yda{bottom:463.906667pt;}
    .y1d3{bottom:464.093333pt;}
    .y96{bottom:464.706667pt;}
    .y259{bottom:466.306667pt;}
    .y17f{bottom:471.906667pt;}
    .y2d{bottom:472.066667pt;}
    .y123{bottom:474.306667pt;}
    .y76{bottom:479.586667pt;}
    .y21e{bottom:481.026667pt;}
    .y106{bottom:486.626667pt;}
    .y51{bottom:487.266667pt;}
    .ybc{bottom:490.146667pt;}
    .yd9{bottom:490.786667pt;}
    .y23a{bottom:491.746667pt;}
    .y258{bottom:492.066667pt;}
    .y1d2{bottom:493.213333pt;}
    .y154{bottom:493.826667pt;}
    .y95{bottom:496.386667pt;}
    .yec{bottom:499.426667pt;}
    .y122{bottom:501.186667pt;}
    .y271{bottom:505.986667pt;}
    .y10{bottom:507.426667pt;}
    .y153{bottom:512.226667pt;}
    .y21d{bottom:512.706667pt;}
    .y50{bottom:513.186667pt;}
    .y105{bottom:513.506667pt;}
    .y2c{bottom:514.146667pt;}
    .yd8{bottom:517.666667pt;}
    .y257{bottom:517.826667pt;}
    .y239{bottom:521.026667pt;}
    .y1d1{bottom:522.493333pt;}
    .ybb{bottom:522.786667pt;}
    .y152{bottom:526.786667pt;}
    .y121{bottom:528.066667pt;}
    .y94{bottom:528.226667pt;}
    .yeb{bottom:535.746667pt;}
    .y270{bottom:537.853333pt;}
    .y4f{bottom:539.293333pt;}
    .y104{bottom:540.413333pt;}
    .y151{bottom:541.533333pt;}
    .y73{bottom:543.133333pt;}
    .y256{bottom:543.613333pt;}
    .y21c{bottom:544.413333pt;}
    .y1d0{bottom:548.613333pt;}
    .y238{bottom:550.173333pt;}
    .y150{bottom:553.693333pt;}
    .y120{bottom:554.973333pt;}
    .yd7{bottom:555.293333pt;}
    .yba{bottom:555.453333pt;}
    .y14f{bottom:555.613333pt;}
    .y93{bottom:559.933333pt;}
    .yf{bottom:563.613333pt;}
    .y4e{bottom:565.213333pt;}
    .y255{bottom:569.533333pt;}
    .y14e{bottom:571.773333pt;}
    .yea{bottom:572.253333pt;}
    .y2b{bottom:575.293333pt;}
    .y21b{bottom:576.253333pt;}
    .y103{bottom:578.013333pt;}
    .y237{bottom:579.453333pt;}
    .y11f{bottom:581.853333pt;}
    .yd6{bottom:582.013333pt;}
    .y14d{bottom:587.773333pt;}
    .yb9{bottom:588.093333pt;}
    .y26f{bottom:589.053333pt;}
    .y4d{bottom:591.133333pt;}
    .y92{bottom:591.613333pt;}
    .y254{bottom:595.293333pt;}
    .y72{bottom:595.773333pt;}
    .y14b{bottom:603.773333pt;}
    .y102{bottom:604.893333pt;}
    .y21a{bottom:607.933333pt;}
    .y26e{bottom:608.573333pt;}
    .ye9{bottom:608.733333pt;}
    .yd5{bottom:608.893333pt;}
    .ye{bottom:609.693333pt;}
    .y4c{bottom:617.213333pt;}
    .y71{bottom:618.173333pt;}
    .y14a{bottom:619.933333pt;}
    .yb8{bottom:620.733333pt;}
    .y1ca{bottom:620.933333pt;}
    .y253{bottom:621.053333pt;}
    .y91{bottom:623.453333pt;}
    .y26d{bottom:628.093333pt;}
    .y101{bottom:631.613333pt;}
    .y11e{bottom:635.453333pt;}
    .yd4{bottom:635.773333pt;}
    .y149{bottom:635.933333pt;}
    .y2a{bottom:636.413333pt;}
    .y176{bottom:638.653333pt;}
    .y219{bottom:639.773333pt;}
    .y4b{bottom:643.133333pt;}
    .y236{bottom:645.213333pt;}
    .ye8{bottom:646.493333pt;}
    .y252{bottom:646.813333pt;}
    .y70{bottom:648.733333pt;}
    .y148{bottom:651.133333pt;}
    .yb7{bottom:653.373333pt;}
    .y90{bottom:654.653333pt;}
    .y1c9{bottom:657.413333pt;}
    .y100{bottom:658.493333pt;}
    .y26c{bottom:659.933333pt;}
    .y11d{bottom:662.333333pt;}
    .y147{bottom:666.813333pt;}
    .y146{bottom:668.733333pt;}
    .y4a{bottom:669.213333pt;}
    .y235{bottom:671.133333pt;}
    .y218{bottom:671.453333pt;}
    .y251{bottom:672.573333pt;}
    .yd3{bottom:673.373333pt;}
    .y1e0{bottom:678.533333pt;}
    .y1c8{bottom:678.693333pt;}
    .y6f{bottom:680.413333pt;}
    .y145{bottom:684.893333pt;}
    .yff{bottom:685.373333pt;}
    .y29{bottom:686.813333pt;}
    .yb6{bottom:687.293333pt;}
    .y8f{bottom:687.933333pt;}
    .y11c{bottom:689.213333pt;}
    .y26b{bottom:691.613333pt;}
    .y49{bottom:695.133333pt;}
    .y1c6{bottom:696.613333pt;}
    .y234{bottom:696.893333pt;}
    .y175{bottom:697.533333pt;}
    .y250{bottom:698.493333pt;}
    .yd2{bottom:700.093333pt;}
    .y144{bottom:700.893333pt;}
    .y217{bottom:703.133333pt;}
    .y8e{bottom:706.493333pt;}
    .y6e{bottom:712.253333pt;}
    .y1c2{bottom:712.613333pt;}
    .y174{bottom:714.173333pt;}
    .y11b{bottom:716.093333pt;}
    .y141{bottom:717.053333pt;}
    .y48{bottom:721.053333pt;}
    .y233{bottom:722.653333pt;}
    .y26a{bottom:723.293333pt;}
    .y24f{bottom:724.253333pt;}
    .yb5{bottom:725.053333pt;}
    .y173{bottom:725.533333pt;}
    .ye7{bottom:726.973333pt;}
    .y19c{bottom:727.280000pt;}
    .y142{bottom:729.693333pt;}
    .y1c4{bottom:730.560000pt;}
    .y13f{bottom:732.093333pt;}
    .y216{bottom:734.973333pt;}
    .yd1{bottom:737.693333pt;}
    .y8c{bottom:741.053333pt;}
    .y6d{bottom:742.493333pt;}
    .y28{bottom:743.933333pt;}
    .y47{bottom:747.133333pt;}
    .y13d{bottom:748.093333pt;}
    .y1b6{bottom:748.504594pt;}
    .y1a3{bottom:748.504652pt;}
    .y1ab{bottom:748.504657pt;}
    .yfe{bottom:749.693333pt;}
    .y24e{bottom:750.013333pt;}
    .yb4{bottom:751.933333pt;}
    .y11a{bottom:753.533333pt;}
    .ye6{bottom:753.853333pt;}
    .y269{bottom:755.133333pt;}
    .y232{bottom:758.973333pt;}
    .y13b{bottom:763.133333pt;}
    .yd0{bottom:764.573333pt;}
    .y215{bottom:766.653333pt;}
    .y8b{bottom:771.133333pt;}
    .y6c{bottom:771.773333pt;}
    .y46{bottom:773.053333pt;}
    .y1bc{bottom:773.186216pt;}
    .y1a0{bottom:773.186274pt;}
    .y24d{bottom:775.813333pt;}
    .yfd{bottom:776.613333pt;}
    .yb3{bottom:778.693333pt;}
    .y231{bottom:784.933333pt;}
    .y268{bottom:785.413333pt;}
    .yab{bottom:785.733333pt;}
    .y67{bottom:786.533333pt;}
    .y119{bottom:791.173333pt;}
    .ycf{bottom:791.493333pt;}
    .y27{bottom:792.933333pt;}
    .y1ba{bottom:797.887549pt;}
    .y19e{bottom:797.887607pt;}
    .y139{bottom:798.213333pt;}
    .y214{bottom:798.533333pt;}
    .y45{bottom:799.173333pt;}
    .y24c{bottom:801.573333pt;}
    .yfc{bottom:803.493333pt;}
    .yaa{bottom:804.293333pt;}
    .y6b{bottom:805.093333pt;}
    .yb2{bottom:805.573333pt;}
    .y267{bottom:814.693333pt;}
    .y138{bottom:816.773333pt;}
    .y118{bottom:818.053333pt;}
    .ye5{bottom:818.213333pt;}
    .y230{bottom:821.253333pt;}
    .y1b8{bottom:822.569992pt;}
    .y1a9{bottom:822.570050pt;}
    .y6a{bottom:823.653333pt;}
    .y44{bottom:825.093333pt;}
    .y24b{bottom:827.493333pt;}
    .yce{bottom:828.933333pt;}
    .yfb{bottom:830.373333pt;}
    .y137{bottom:831.173333pt;}
    .yb1{bottom:832.453333pt;}
    .y213{bottom:835.973333pt;}
    .yd{bottom:839.333333pt;}
    .ya9{bottom:840.773333pt;}
    .y5{bottom:841.893333pt;}
    .y136{bottom:845.893333pt;}
    .y1a5{bottom:847.250792pt;}
    .y1ad{bottom:847.250850pt;}
    .y43{bottom:851.173333pt;}
    .y24a{bottom:853.253333pt;}
    .y117{bottom:855.493333pt;}
    .ycd{bottom:855.813333pt;}
    .y22f{bottom:857.733333pt;}
    .y66{bottom:858.373333pt;}
    .ya8{bottom:859.333333pt;}
    .y135{bottom:860.133333pt;}
    .y212{bottom:862.053333pt;}
    .y26{bottom:862.213333pt;}
    .yfa{bottom:867.813333pt;}
    .y65{bottom:872.933333pt;}
    .y1b4{bottom:872.933608pt;}
    .y1c1{bottom:872.933665pt;}
    .y42{bottom:877.093333pt;}
    .ya7{bottom:877.893333pt;}
    .y249{bottom:879.013333pt;}
    .ycc{bottom:882.693333pt;}
    .y22e{bottom:883.653333pt;}
    .y134{bottom:884.293333pt;}
    .yb0{bottom:886.213333pt;}
    .y19a{bottom:886.263704pt;}
    .y211{bottom:887.813333pt;}
    .y64{bottom:891.493333pt;}
    .y116{bottom:893.093333pt;}
    .yf9{bottom:894.693333pt;}
    .ya6{bottom:896.453333pt;}
    .y1b0{bottom:897.614434pt;}
    .yc{bottom:899.813333pt;}
    .y41{bottom:903.013333pt;}
    .y248{bottom:904.773333pt;}
    .y22d{bottom:909.413333pt;}
    .ycb{bottom:909.573333pt;}
    .y63{bottom:910.053333pt;}
    .y133{bottom:911.173333pt;}
    .yaf{bottom:913.093333pt;}
    .y266{bottom:913.413333pt;}
    .y210{bottom:913.573333pt;}
    .ya5{bottom:915.013333pt;}
    .yb{bottom:928.293333pt;}
    .y62{bottom:928.613333pt;}
    .y40{bottom:929.093333pt;}
    .y115{bottom:930.533333pt;}
    .y25{bottom:931.493333pt;}
    .yf8{bottom:932.293333pt;}
    .ya4{bottom:933.573333pt;}
    .y22c{bottom:935.333333pt;}
    .yca{bottom:936.453333pt;}
    .y132{bottom:938.053333pt;}
    .y20f{bottom:939.333333pt;}
    .yae{bottom:939.813333pt;}
    .y1a7{bottom:942.072701pt;}
    .y6{bottom:946.053333pt;}
    .y61{bottom:947.173333pt;}
    .ya1{bottom:953.733333pt;}
    .y3f{bottom:955.013333pt;}
    .y247{bottom:956.453333pt;}
    .ya{bottom:956.933333pt;}
    .yf7{bottom:959.173333pt;}
    .y22b{bottom:961.093333pt;}
    .yc9{bottom:963.173333pt;}
    .y131{bottom:964.933333pt;}
    .y20e{bottom:965.093333pt;}
    .y60{bottom:965.733333pt;}
    .yad{bottom:966.693333pt;}
    .y114{bottom:968.133333pt;}
    .y3e{bottom:981.093333pt;}
    .y172{bottom:982.373333pt;}
    .y130{bottom:983.173333pt;}
    .y8a{bottom:984.453333pt;}
    .y9{bottom:985.573333pt;}
    .y246{bottom:986.373333pt;}
    .yc8{bottom:990.533333pt;}
    .yf6{bottom:990.693333pt;}
    .y20d{bottom:992.453333pt;}
    .y22a{bottom:992.613333pt;}
    .yac{bottom:994.533333pt;}
    .y5f{bottom:995.813333pt;}
    .y24{bottom:996.613333pt;}
    .y3d{bottom:1001.733333pt;}
    .y5e{bottom:1005.573333pt;}
    .y20c{bottom:1007.493333pt;}
    .y7{bottom:1009.440000pt;}
    .y8{bottom:1014.080000pt;}
    .y1d{bottom:1023.520000pt;}
    .y20b{bottom:1025.440000pt;}
    .y19{bottom:1039.520000pt;}
    .y209{bottom:1041.440000pt;}
    .y1b{bottom:1057.440000pt;}
    .y20a{bottom:1059.360000pt;}
    .y2{bottom:1061.440000pt;}
    .h39{height:0.959960pt;}
    .h2f{height:0.960000pt;}
    .h34{height:1.280027pt;}
    .h2c{height:1.440000pt;}
    .h35{height:9.440000pt;}
    .h16{height:9.466875pt;}
    .h31{height:10.720000pt;}
    .h3f{height:10.862088pt;}
    .h2d{height:11.680000pt;}
    .h30{height:13.920000pt;}
    .h21{height:13.921875pt;}
    .h29{height:14.080000pt;}
    .h2b{height:15.040000pt;}
    .h2e{height:15.200000pt;}
    .h1e{height:17.760000pt;}
    .h8{height:17.920000pt;}
    .h52{height:17.952000pt;}
    .h1f{height:19.520000pt;}
    .h4c{height:24.188007pt;}
    .h43{height:24.188010pt;}
    .h4e{height:24.188014pt;}
    .h4a{height:24.208569pt;}
    .h4b{height:25.194129pt;}
    .h49{height:25.194132pt;}
    .h44{height:25.194136pt;}
    .h40{height:25.569379pt;}
    .h1d{height:26.080000pt;}
    .h1c{height:27.680000pt;}
    .h38{height:28.160000pt;}
    .h36{height:28.192000pt;}
    .h37{height:29.120000pt;}
    .h23{height:31.828125pt;}
    .h32{height:33.440000pt;}
    .h2a{height:33.472000pt;}
    .h45{height:35.050094pt;}
    .h42{height:35.372335pt;}
    .h19{height:35.680000pt;}
    .h7{height:35.840000pt;}
    .h51{height:35.872000pt;}
    .h48{height:36.414230pt;}
    .h33{height:37.310625pt;}
    .hd{height:41.765625pt;}
    .hc{height:42.140625pt;}
    .h3a{height:42.240000pt;}
    .h13{height:46.220625pt;}
    .h46{height:46.505934pt;}
    .h12{height:46.635625pt;}
    .h24{height:47.380000pt;}
    .h22{height:47.742188pt;}
    .h4d{height:48.889356pt;}
    .ha{height:48.992000pt;}
    .h28{height:49.148438pt;}
    .h26{height:49.622500pt;}
    .h18{height:51.232500pt;}
    .h15{height:51.692500pt;}
    .hb{height:52.834688pt;}
    .h17{height:55.040000pt;}
    .h1b{height:57.104000pt;}
    .h2{height:58.563750pt;}
    .h9{height:60.288750pt;}
    .h25{height:63.001600pt;}
    .h1a{height:63.232000pt;}
    .h27{height:63.296000pt;}
    .h11{height:63.656250pt;}
    .h20{height:65.531250pt;}
    .h14{height:71.296875pt;}
    .h3b{height:82.720000pt;}
    .h3c{height:82.752000pt;}
    .h3e{height:83.680000pt;}
    .h10{height:87.156563pt;}
    .h6{height:98.296875pt;}
    .he{height:109.437187pt;}
    .h47{height:123.937872pt;}
    .h3d{height:125.952000pt;}
    .h5{height:152.687812pt;}
    .hf{height:169.070625pt;}
    .h4{height:196.593750pt;}
    .h41{height:249.840736pt;}
    .h4f{height:793.760000pt;}
    .h50{height:794.240000pt;}
    .h3{height:1055.520000pt;}
    .h0{height:1122.560000pt;}
    .h1{height:1122.880000pt;}
    .w39{width:11.346519pt;}
    .w25{width:12.320000pt;}
    .w2c{width:13.600000pt;}
    .w2d{width:13.760000pt;}
    .wa{width:37.760000pt;}
    .w4b{width:37.920000pt;}
    .w34{width:40.000588pt;}
    .w13{width:42.240000pt;}
    .w23{width:50.272000pt;}
    .w44{width:55.360000pt;}
    .w29{width:56.672000pt;}
    .w3{width:62.560000pt;}
    .w1e{width:65.312000pt;}
    .we{width:65.472000pt;}
    .w35{width:78.500641pt;}
    .w14{width:84.800000pt;}
    .w15{width:89.472000pt;}
    .w26{width:92.320000pt;}
    .w37{width:93.304560pt;}
    .w19{width:93.952000pt;}
    .w2f{width:94.592000pt;}
    .w2e{width:98.272000pt;}
    .w11{width:103.392000pt;}
    .w20{width:112.192000pt;}
    .w10{width:112.640000pt;}
    .wb{width:116.480000pt;}
    .w4{width:121.472000pt;}
    .w45{width:121.632000pt;}
    .w1b{width:121.920000pt;}
    .w16{width:122.592000pt;}
    .w8{width:132.160000pt;}
    .w31{width:139.840000pt;}
    .w18{width:140.800000pt;}
    .w3b{width:145.638319pt;}
    .w3a{width:157.494608pt;}
    .w21{width:186.266667pt;}
    .w1d{width:190.746667pt;}
    .w42{width:193.760000pt;}
    .wd{width:195.866667pt;}
    .w3f{width:196.800000pt;}
    .w2a{width:197.946667pt;}
    .w6{width:207.226667pt;}
    .w47{width:207.386667pt;}
    .wf{width:232.986667pt;}
    .w1f{width:233.146667pt;}
    .w17{width:278.746667pt;}
    .w38{width:280.908549pt;}
    .w30{width:324.066667pt;}
    .w7{width:340.226667pt;}
    .w48{width:349.666667pt;}
    .w4a{width:359.106667pt;}
    .w40{width:367.906667pt;}
    .w1a{width:377.026667pt;}
    .w12{width:395.906667pt;}
    .w2b{width:402.146667pt;}
    .w49{width:453.693333pt;}
    .w9{width:453.853333pt;}
    .w1c{width:490.493333pt;}
    .wc{width:495.613333pt;}
    .w27{width:514.813333pt;}
    .w5{width:547.453333pt;}
    .w46{width:557.053333pt;}
    .w3e{width:564.706667pt;}
    .w24{width:607.133333pt;}
    .w28{width:656.773333pt;}
    .w22{width:657.413333pt;}
    .w43{width:664.573333pt;}
    .w36{width:669.937906pt;}
    .w32{width:670.431233pt;}
    .w33{width:670.431237pt;}
    .w2{width:793.759988pt;}
    .w0{width:793.760000pt;}
    .w1{width:794.240000pt;}
    .w41{width:1122.559983pt;}
    .w3c{width:1122.560000pt;}
    .w3d{width:1122.880000pt;}
    .x0{left:0.000000pt;}
    .x5e{left:1.479981pt;}
    .x43{left:4.320000pt;}
    .x2b{left:5.760000pt;}
    .xc{left:7.200000pt;}
    .xe{left:9.760000pt;}
    .x4e{left:11.680000pt;}
    .x26{left:13.120000pt;}
    .x29{left:15.840000pt;}
    .x13{left:17.920000pt;}
    .x50{left:19.520000pt;}
    .x2c{left:21.120000pt;}
    .x57{left:24.160000pt;}
    .x24{left:25.920000pt;}
    .x5c{left:28.637626pt;}
    .x54{left:30.080000pt;}
    .x27{left:32.360000pt;}
    .x56{left:33.792000pt;}
    .x2{left:37.920000pt;}
    .x55{left:40.640000pt;}
    .x2d{left:42.240000pt;}
    .x3{left:45.920000pt;}
    .x53{left:53.920000pt;}
    .x2e{left:61.120000pt;}
    .x1{left:66.239988pt;}
    .x58{left:68.693324pt;}
    .x10{left:85.152000pt;}
    .x1b{left:90.752000pt;}
    .x22{left:92.352000pt;}
    .x30{left:94.912000pt;}
    .x6d{left:99.712000pt;}
    .x36{left:104.031988pt;}
    .x3f{left:113.471988pt;}
    .x11{left:116.954667pt;}
    .x4{left:123.071988pt;}
    .x39{left:127.391988pt;}
    .x23{left:134.906667pt;}
    .x7{left:137.946655pt;}
    .x8{left:142.106655pt;}
    .x49{left:145.466667pt;}
    .x62{left:147.834667pt;}
    .x3a{left:151.386655pt;}
    .x47{left:158.586667pt;}
    .x3c{left:160.666655pt;}
    .x3d{left:162.266655pt;}
    .x4f{left:165.786667pt;}
    .x59{left:168.347799pt;}
    .x5a{left:171.801089pt;}
    .x15{left:176.826655pt;}
    .x44{left:179.906667pt;}
    .x41{left:184.866667pt;}
    .xd{left:189.786667pt;}
    .x1f{left:203.546667pt;}
    .x1c{left:208.026667pt;}
    .x45{left:209.466667pt;}
    .x4a{left:214.146667pt;}
    .x12{left:217.306667pt;}
    .x25{left:219.866667pt;}
    .x4c{left:224.826655pt;}
    .x60{left:227.866667pt;}
    .x40{left:229.666667pt;}
    .x6e{left:231.866667pt;}
    .x19{left:236.346655pt;}
    .x3e{left:241.306655pt;}
    .x16{left:244.826655pt;}
    .x5d{left:255.239107pt;}
    .x51{left:261.026667pt;}
    .x46{left:265.506667pt;}
    .x35{left:272.226655pt;}
    .xb{left:277.826655pt;}
    .x72{left:292.546655pt;}
    .x2f{left:298.946655pt;}
    .x20{left:307.586667pt;}
    .x28{left:309.666667pt;}
    .x21{left:314.786655pt;}
    .x48{left:321.506667pt;}
    .x73{left:329.506655pt;}
    .x31{left:330.946667pt;}
    .x38{left:352.226655pt;}
    .x71{left:357.346655pt;}
    .x3b{left:361.346655pt;}
    .x17{left:364.386655pt;}
    .x1a{left:370.626655pt;}
    .x18{left:376.386655pt;}
    .x70{left:387.586667pt;}
    .xf{left:397.026667pt;}
    .x4b{left:401.666655pt;}
    .x1d{left:404.546667pt;}
    .x9{left:406.466655pt;}
    .x32{left:409.186667pt;}
    .x6{left:415.933322pt;}
    .xa{left:420.733322pt;}
    .x2a{left:432.413333pt;}
    .x64{left:437.346650pt;}
    .x1e{left:470.653333pt;}
    .x33{left:475.133333pt;}
    .x34{left:522.013333pt;}
    .x74{left:545.213322pt;}
    .x61{left:548.226667pt;}
    .x68{left:557.666650pt;}
    .x5f{left:581.136622pt;}
    .x52{left:585.733333pt;}
    .x5{left:647.973322pt;}
    .x5b{left:660.126479pt;}
    .x14{left:671.173333pt;}
    .x6f{left:685.573333pt;}
    .x42{left:724.613333pt;}
    .x37{left:737.413322pt;}
    .x4d{left:740.293322pt;}
    .x66{left:971.813333pt;}
    .x63{left:986.373333pt;}
    .x67{left:1062.079983pt;}
    .x6a{left:1067.839983pt;}
    .x6c{left:1073.759983pt;}
    .x69{left:1082.559983pt;}
    .x6b{left:1084.319983pt;}
    .x65{left:1086.559983pt;}
    }
    </style>
    <script>
    /*
     Copyright 2012 Mozilla Foundation 
     Copyright 2013 Lu Wang <coolwanglu@gmail.com>
     Apachine License Version 2.0 
    */
    (function(){function b(a,b,e,f){var c=(a.className||"").split(/\s+/g);""===c[0]&&c.shift();var d=c.indexOf(b);0>d&&e&&c.push(b);0<=d&&f&&c.splice(d,1);a.className=c.join(" ");return 0<=d}if(!("classList"in document.createElement("div"))){var e={add:function(a){b(this.element,a,!0,!1)},contains:function(a){return b(this.element,a,!1,!1)},remove:function(a){b(this.element,a,!1,!0)},toggle:function(a){b(this.element,a,!0,!0)}};Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){if(this._classList)return this._classList;
    var a=Object.create(e,{element:{value:this,writable:!1,enumerable:!0}});Object.defineProperty(this,"_classList",{value:a,writable:!1,enumerable:!1});return a},enumerable:!0})}})();
    </script>
    <script>
    (function(){/*
     pdf2htmlEX.js: Core UI functions for pdf2htmlEX 
     Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com> and other contributors 
     https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE 
    */
    var pdf2htmlEX=window.pdf2htmlEX=window.pdf2htmlEX||{},CSS_CLASS_NAMES={page_frame:"pf",page_content_box:"pc",page_data:"pi",background_image:"bi",link:"l",input_radio:"ir",__dummy__:"no comma"},DEFAULT_CONFIG={container_id:"page-container",sidebar_id:"sidebar",outline_id:"outline",loading_indicator_cls:"loading-indicator",preload_pages:3,render_timeout:100,scale_step:0.9,key_handler:!0,hashchange_handler:!0,view_history_handler:!0,__dummy__:"no comma"},EPS=1E-6;
    function invert(a){var b=a[0]*a[3]-a[1]*a[2];return[a[3]/b,-a[1]/b,-a[2]/b,a[0]/b,(a[2]*a[5]-a[3]*a[4])/b,(a[1]*a[4]-a[0]*a[5])/b]}function transform(a,b){return[a[0]*b[0]+a[2]*b[1]+a[4],a[1]*b[0]+a[3]*b[1]+a[5]]}function get_page_number(a){return parseInt(a.getAttribute("data-page-no"),16)}function disable_dragstart(a){for(var b=0,c=a.length;b<c;++b)a[b].addEventListener("dragstart",function(){return!1},!1)}
    function clone_and_extend_objs(a){for(var b={},c=0,e=arguments.length;c<e;++c){var h=arguments[c],d;for(d in h)h.hasOwnProperty(d)&&(b[d]=h[d])}return b}
    function Page(a){if(a){this.shown=this.loaded=!1;this.page=a;this.num=get_page_number(a);this.original_height=a.clientHeight;this.original_width=a.clientWidth;var b=a.getElementsByClassName(CSS_CLASS_NAMES.page_content_box)[0];b&&(this.content_box=b,this.original_scale=this.cur_scale=this.original_height/b.clientHeight,this.page_data=JSON.parse(a.getElementsByClassName(CSS_CLASS_NAMES.page_data)[0].getAttribute("data-data")),this.ctm=this.page_data.ctm,this.ictm=invert(this.ctm),this.loaded=!0)}}
    Page.prototype={hide:function(){this.loaded&&this.shown&&(this.content_box.classList.remove("opened"),this.shown=!1)},show:function(){this.loaded&&!this.shown&&(this.content_box.classList.add("opened"),this.shown=!0)},rescale:function(a){this.cur_scale=0===a?this.original_scale:a;this.loaded&&(a=this.content_box.style,a.msTransform=a.webkitTransform=a.transform="scale("+this.cur_scale.toFixed(3)+")");a=this.page.style;a.height=this.original_height*this.cur_scale+"px";a.width=this.original_width*this.cur_scale+
    "px"},view_position:function(){var a=this.page,b=a.parentNode;return[b.scrollLeft-a.offsetLeft-a.clientLeft,b.scrollTop-a.offsetTop-a.clientTop]},height:function(){return this.page.clientHeight},width:function(){return this.page.clientWidth}};function Viewer(a){this.config=clone_and_extend_objs(DEFAULT_CONFIG,0<arguments.length?a:{});this.pages_loading=[];this.init_before_loading_content();var b=this;document.addEventListener("DOMContentLoaded",function(){b.init_after_loading_content()},!1)}
    Viewer.prototype={scale:1,cur_page_idx:0,first_page_idx:0,init_before_loading_content:function(){this.pre_hide_pages()},initialize_radio_button:function(){for(var a=document.getElementsByClassName(CSS_CLASS_NAMES.input_radio),b=0;b<a.length;b++)a[b].addEventListener("click",function(){this.classList.toggle("checked")})},init_after_loading_content:function(){this.sidebar=document.getElementById(this.config.sidebar_id);this.outline=document.getElementById(this.config.outline_id);this.container=document.getElementById(this.config.container_id);
    this.loading_indicator=document.getElementsByClassName(this.config.loading_indicator_cls)[0];for(var a=!0,b=this.outline.childNodes,c=0,e=b.length;c<e;++c)if("ul"===b[c].nodeName.toLowerCase()){a=!1;break}a||this.sidebar.classList.add("opened");this.find_pages();if(0!=this.pages.length){disable_dragstart(document.getElementsByClassName(CSS_CLASS_NAMES.background_image));this.config.key_handler&&this.register_key_handler();var h=this;this.config.hashchange_handler&&window.addEventListener("hashchange",
    function(a){h.navigate_to_dest(document.location.hash.substring(1))},!1);this.config.view_history_handler&&window.addEventListener("popstate",function(a){a.state&&h.navigate_to_dest(a.state)},!1);this.container.addEventListener("scroll",function(){h.update_page_idx();h.schedule_render(!0)},!1);[this.container,this.outline].forEach(function(a){a.addEventListener("click",h.link_handler.bind(h),!1)});this.initialize_radio_button();this.render()}},find_pages:function(){for(var a=[],b={},c=this.container.childNodes,
    e=0,h=c.length;e<h;++e){var d=c[e];d.nodeType===Node.ELEMENT_NODE&&d.classList.contains(CSS_CLASS_NAMES.page_frame)&&(d=new Page(d),a.push(d),b[d.num]=a.length-1)}this.pages=a;this.page_map=b},load_page:function(a,b,c){var e=this.pages;if(!(a>=e.length||(e=e[a],e.loaded||this.pages_loading[a]))){var e=e.page,h=e.getAttribute("data-page-url");if(h){this.pages_loading[a]=!0;var d=e.getElementsByClassName(this.config.loading_indicator_cls)[0];"undefined"===typeof d&&(d=this.loading_indicator.cloneNode(!0),
    d.classList.add("active"),e.appendChild(d));var f=this,g=new XMLHttpRequest;g.open("GET",h,!0);g.onload=function(){if(200===g.status||0===g.status){var b=document.createElement("div");b.innerHTML=g.responseText;for(var d=null,b=b.childNodes,e=0,h=b.length;e<h;++e){var p=b[e];if(p.nodeType===Node.ELEMENT_NODE&&p.classList.contains(CSS_CLASS_NAMES.page_frame)){d=p;break}}b=f.pages[a];f.container.replaceChild(d,b.page);b=new Page(d);f.pages[a]=b;b.hide();b.rescale(f.scale);disable_dragstart(d.getElementsByClassName(CSS_CLASS_NAMES.background_image));
    f.schedule_render(!1);c&&c(b)}delete f.pages_loading[a]};g.send(null)}void 0===b&&(b=this.config.preload_pages);0<--b&&(f=this,setTimeout(function(){f.load_page(a+1,b)},0))}},pre_hide_pages:function(){var a="@media screen{."+CSS_CLASS_NAMES.page_content_box+"{display:none;}}",b=document.createElement("style");b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));document.head.appendChild(b)},render:function(){for(var a=this.container,b=a.scrollTop,c=a.clientHeight,a=b-c,b=
    b+c+c,c=this.pages,e=0,h=c.length;e<h;++e){var d=c[e],f=d.page,g=f.offsetTop+f.clientTop,f=g+f.clientHeight;g<=b&&f>=a?d.loaded?d.show():this.load_page(e):d.hide()}},update_page_idx:function(){var a=this.pages,b=a.length;if(!(2>b)){for(var c=this.container,e=c.scrollTop,c=e+c.clientHeight,h=-1,d=b,f=d-h;1<f;){var g=h+Math.floor(f/2),f=a[g].page;f.offsetTop+f.clientTop+f.clientHeight>=e?d=g:h=g;f=d-h}this.first_page_idx=d;for(var g=h=this.cur_page_idx,k=0;d<b;++d){var f=a[d].page,l=f.offsetTop+f.clientTop,
    f=f.clientHeight;if(l>c)break;f=(Math.min(c,l+f)-Math.max(e,l))/f;if(d===h&&Math.abs(f-1)<=EPS){g=h;break}f>k&&(k=f,g=d)}this.cur_page_idx=g}},schedule_render:function(a){if(void 0!==this.render_timer){if(!a)return;clearTimeout(this.render_timer)}var b=this;this.render_timer=setTimeout(function(){delete b.render_timer;b.render()},this.config.render_timeout)},register_key_handler:function(){var a=this;window.addEventListener("DOMMouseScroll",function(b){if(b.ctrlKey){b.preventDefault();var c=a.container,
    e=c.getBoundingClientRect(),c=[b.clientX-e.left-c.clientLeft,b.clientY-e.top-c.clientTop];a.rescale(Math.pow(a.config.scale_step,b.detail),!0,c)}},!1);window.addEventListener("keydown",function(b){var c=!1,e=b.ctrlKey||b.metaKey,h=b.altKey;switch(b.keyCode){case 61:case 107:case 187:e&&(a.rescale(1/a.config.scale_step,!0),c=!0);break;case 173:case 109:case 189:e&&(a.rescale(a.config.scale_step,!0),c=!0);break;case 48:e&&(a.rescale(0,!1),c=!0);break;case 33:h?a.scroll_to(a.cur_page_idx-1):a.container.scrollTop-=
    a.container.clientHeight;c=!0;break;case 34:h?a.scroll_to(a.cur_page_idx+1):a.container.scrollTop+=a.container.clientHeight;c=!0;break;case 35:a.container.scrollTop=a.container.scrollHeight;c=!0;break;case 36:a.container.scrollTop=0,c=!0}c&&b.preventDefault()},!1)},rescale:function(a,b,c){var e=this.scale;this.scale=a=0===a?1:b?e*a:a;c||(c=[0,0]);b=this.container;c[0]+=b.scrollLeft;c[1]+=b.scrollTop;for(var h=this.pages,d=h.length,f=this.first_page_idx;f<d;++f){var g=h[f].page;if(g.offsetTop+g.clientTop>=
    c[1])break}g=f-1;0>g&&(g=0);var g=h[g].page,k=g.clientWidth,f=g.clientHeight,l=g.offsetLeft+g.clientLeft,m=c[0]-l;0>m?m=0:m>k&&(m=k);k=g.offsetTop+g.clientTop;c=c[1]-k;0>c?c=0:c>f&&(c=f);for(f=0;f<d;++f)h[f].rescale(a);b.scrollLeft+=m/e*a+g.offsetLeft+g.clientLeft-m-l;b.scrollTop+=c/e*a+g.offsetTop+g.clientTop-c-k;this.schedule_render(!0)},fit_width:function(){var a=this.cur_page_idx;this.rescale(this.container.clientWidth/this.pages[a].width(),!0);this.scroll_to(a)},fit_height:function(){var a=this.cur_page_idx;
    this.rescale(this.container.clientHeight/this.pages[a].height(),!0);this.scroll_to(a)},get_containing_page:function(a){for(;a;){if(a.nodeType===Node.ELEMENT_NODE&&a.classList.contains(CSS_CLASS_NAMES.page_frame)){a=get_page_number(a);var b=this.page_map;return a in b?this.pages[b[a]]:null}a=a.parentNode}return null},link_handler:function(a){var b=a.target,c=b.getAttribute("data-dest-detail");if(c){if(this.config.view_history_handler)try{var e=this.get_current_view_hash();window.history.replaceState(e,
    "","#"+e);window.history.pushState(c,"","#"+c)}catch(h){}this.navigate_to_dest(c,this.get_containing_page(b));a.preventDefault()}},navigate_to_dest:function(a,b){try{var c=JSON.parse(a)}catch(e){return}if(c instanceof Array){var h=c[0],d=this.page_map;if(h in d){for(var f=d[h],h=this.pages[f],d=2,g=c.length;d<g;++d){var k=c[d];if(null!==k&&"number"!==typeof k)return}for(;6>c.length;)c.push(null);var g=b||this.pages[this.cur_page_idx],d=g.view_position(),d=transform(g.ictm,[d[0],g.height()-d[1]]),
    g=this.scale,l=[0,0],m=!0,k=!1,n=this.scale;switch(c[1]){case "XYZ":l=[null===c[2]?d[0]:c[2]*n,null===c[3]?d[1]:c[3]*n];g=c[4];if(null===g||0===g)g=this.scale;k=!0;break;case "Fit":case "FitB":l=[0,0];k=!0;break;case "FitH":case "FitBH":l=[0,null===c[2]?d[1]:c[2]*n];k=!0;break;case "FitV":case "FitBV":l=[null===c[2]?d[0]:c[2]*n,0];k=!0;break;case "FitR":l=[c[2]*n,c[5]*n],m=!1,k=!0}if(k){this.rescale(g,!1);var p=this,c=function(a){l=transform(a.ctm,l);m&&(l[1]=a.height()-l[1]);p.scroll_to(f,l)};h.loaded?
    c(h):(this.load_page(f,void 0,c),this.scroll_to(f))}}}},scroll_to:function(a,b){var c=this.pages;if(!(0>a||a>=c.length)){c=c[a].view_position();void 0===b&&(b=[0,0]);var e=this.container;e.scrollLeft+=b[0]-c[0];e.scrollTop+=b[1]-c[1]}},get_current_view_hash:function(){var a=[],b=this.pages[this.cur_page_idx];a.push(b.num);a.push("XYZ");var c=b.view_position(),c=transform(b.ictm,[c[0],b.height()-c[1]]);a.push(c[0]/this.scale);a.push(c[1]/this.scale);a.push(this.scale);return JSON.stringify(a)}};
    pdf2htmlEX.Viewer=Viewer;})();
    </script>
    <script>
    try{
    pdf2htmlEX.defaultViewer = new pdf2htmlEX.Viewer({});
    }catch(e){}
    </script>
    <title></title>
    </head>
    <body>
    <div id="sidebar">
    <div id="outline">
    </div>1
    </div>
    <div id="page-container">
    <div id="pf1" class="pf w0 h0" data-page-no="1"><div class="pc pc1 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/q1qCVn7/amd-1.png"/><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y2 ff1 fs0 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x2 y3 w3 h3"><div class="t m1 x3 h4 y4 ff2 fs1 fc1 sc0 ls0 ws0">AVALIAÇÃO ERGONÔMICA PRELIMINAR</div><div class="t m1 x3 h4 y5 ff2 fs1 fc1 sc0 ls0 ws0"> <span class="ff3">–</span> <span class="ls1">NR</span></div><div class="t m1 x3 h4 y6 ff2 fs1 fc1 sc0 ls0 ws0">-<span class="ls2">17</span></div><div class="t m1 x3 h4 y7 ff2 fs1 fc1 sc0 ls0 ws0"> </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x4 h2 y8 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 y9 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 ya ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 yb ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 yc ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h4 yd ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>      <span class="ff2 fs1"> <span class="_ _1"> </span> </span></div><div class="t m0 x5 h5 ye ff2 fs2 fc2 sc0 ls0 ws0"> </div><div class="t m0 x6 h5 yf ff2 fs2 fc2 sc0 ls0 ws0"> </div><div class="t m0 x7 h5 y10 ff2 fs2 fc2 sc0 ls0 ws0">Administração Guaíra, Almox<span class="_ _2"></span>arifado, </div><div class="t m0 x8 h4 y11 ff2 fs2 fc2 sc0 ls0 ws0">Almoxarifado Manutenção Pri<span class="_ _2"></span>mária.<span class="_ _2"></span><span class="fs1 fc0"> </span></div><div class="t m0 x9 h4 y12 ff2 fs1 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h4 y13 ff2 fs1 fc0 sc0 ls0 ws0"> </div><div class="t m0 xa h6 y14 ff2 fs3 fc0 sc0 ls0 ws0"> </div><div class="t m0 xa h6 y15 ff2 fs3 fc0 sc0 ls0 ws0"> </div><div class="t m0 xa h6 y16 ff2 fs3 fc0 sc0 ls0 ws0"> </div><div class="t m0 xa h6 y17 ff2 fs3 fc0 sc0 ls0 ws0"> </div><div class="t m0 xb h6 y18 ff2 fs3 fc0 sc0 ls0 ws0">Vigência: 03/<span class="ls3">202</span>3 <span class="ls4">a </span>03/<span class="ls3">202</span>5 </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf2" class="pf w0 h0" data-page-no="2"><div class="pc pc2 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/j5xnj9y/amd-5.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">2 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 xa h6 y24 ff2 fs3 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h4 y25 ff2 fs1 fc0 sc0 ls0 ws0"> </div><div class="t m0 x9 h4 y26 ff2 fs1 fc0 sc0 ls0 ws0"> </div><div class="t m0 x9 h4 y27 ff2 fs1 fc0 sc0 ls0 ws0"> </div><div class="t m0 x9 he y28 ff2 fs6 fc0 sc0 ls0 ws0"> </div><div class="t m0 x15 hf y29 ff2 fs7 fc0 sc0 ls0 ws0">AVALIAÇÃO ERGONÔMIC<span class="_ _2"></span>A </div><div class="t m0 x16 hf y2a ff2 fs7 fc0 sc0 ls0 ws0">PRELIMINAR <span class="ff3">–<span class="_ _2"></span></span> AEP </div><div class="t m0 x4 hf y2b ff2 fs7 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 hf y2c ff2 fs7 fc0 sc0 ls0 ws0"> </div><div class="t m0 x17 h10 y2d ff2 fs8 fc0 sc0 ls0 ws0">NORMA REGULAMENTA<span class="_ _2"></span>DORA NR 1<span class="_ _2"></span>7 </div><div class="t m0 x18 h11 y2e ff1 fs9 fc0 sc0 ls0 ws0">Portaria MTP <span class="lsa">n°</span>423, de 7 de OUTUBRO de 202<span class="ls1">1.</span> </div><div class="t m0 x4 h11 y2f ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y30 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h12 y31 ff4 fs4 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h12 y32 ff4 fs4 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h12 y33 ff4 fs4 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h12 y34 ff4 fs4 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h12 y35 ff4 fs4 fc0 sc0 ls0 ws0"> </div><div class="t m0 x19 h12 y36 ff4 fs4 fc0 sc0 ls0 ws0">TODOS <span class="_ _3"> </span>OS <span class="_ _3"> </span>DIREITOS <span class="_ _3"> </span>RESERVADOS: <span class="_ _4"> </span><span class="ff5">Proibida <span class="_ _3"> </span>a <span class="_ _3"> </span>reprodução <span class="_ _3"> </span>total <span class="_ _3"> </span>ou <span class="_ _3"> </span>parcial, <span class="_ _3"> </span>por </span></div><div class="t m0 x19 h13 y37 ff5 fs4 fc0 sc0 ls0 ws0">qualquer <span class="_ _5"> </span>meio <span class="_ _5"> </span>ou <span class="_ _5"> </span>processo, <span class="_ _5"> </span>especial<span class="_ _2"></span>mente <span class="_ _5"> </span>por <span class="_ _5"> </span>sistemas <span class="_ _5"> </span>gráficos, <span class="_ _5"> </span>microfílmicos, </div><div class="t m0 x19 h13 y38 ff5 fs4 fc0 sc0 ls0 ws0">fotográficos, <span class="_ _6"></span>reprográficos <span class="_ _6"></span>e <span class="_ _6"></span>videográficos. <span class="_ _6"></span>Vedada <span class="_ _7"></span>a <span class="_ _7"></span>memorizaç<span class="_ _2"></span>ão <span class="_ _7"></span>e/ou <span class="_ _6"></span>a <span class="_ _7"></span>recupe<span class="_ _2"></span>ração </div><div class="t m0 x19 h13 y39 ff5 fs4 fc0 sc0 ls0 ws0">total <span class="_ _8"> </span>ou <span class="_ _8"> </span>parcial, <span class="_ _8"> </span>bem <span class="_ _8"> </span>como <span class="_ _8"> </span>a <span class="_ _8"> </span>inclusão <span class="_ _8"> </span>de <span class="_ _8"> </span>qualque<span class="_ _2"></span>r <span class="_ _8"> </span>part<span class="_ _2"></span>e <span class="_ _8"> </span>deste <span class="_ _8"> </span>material <span class="_ _8"> </span>em <span class="_ _8"> </span>qualquer </div><div class="t m0 x19 h13 y3a ff5 fs4 fc0 sc0 ls0 ws0">sistema <span class="_ _8"> </span>de <span class="_ _8"> </span>pr<span class="_ _0"></span>ocessamento <span class="_ _8"> </span>de <span class="_ _8"> </span>dados. <span class="_ _8"> </span>A <span class="_ _6"></span>vi<span class="_ _2"></span>olação <span class="_ _8"> </span>dos <span class="_ _8"> </span>direitos <span class="_ _9"></span>autorais <span class="_ _8"> </span>é <span class="_ _9"> </span>pu<span class="_ _2"></span>nível <span class="_ _9"> </span>como<span class="_ _2"></span> </div><div class="t m0 x19 h13 y3b ff5 fs4 fc0 sc0 ls0 ws0">crime <span class="_ _8"> </span>(a<span class="_ _2"></span>rt. <span class="_ _8"> </span>184 <span class="_ _a"> </span>do <span class="_ _a"> </span>Código <span class="_"> </span>Penal), <span class="_ _8"> </span>com <span class="_ _8"> </span>pe<span class="_ _2"></span>na <span class="_ _8"> </span>de <span class="_"> </span>pr<span class="_ _0"></span>isão <span class="_ _a"> </span>e <span class="_ _a"> </span>multa, <span class="_ _a"> </span>busca <span class="_ _a"> </span>e <span class="_ _8"> </span>a<span class="_ _2"></span>preensão <span class="_ _8"> </span>e </div><div class="t m0 x19 h13 y3c ff5 fs4 fc0 sc0 ls0 ws0">indenizações diversas (a<span class="_ _2"></span>rts. 101 a 110<span class="_ _2"></span> da Lei nº 9.610/98).<span class="_ _2"></span> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf3" class="pf w0 h0" data-page-no="3"><div class="pc pc3 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/QK2KRVn/amd-6.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">3 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1a h14 y3d ff7 fsa fc0 sc1 ls0 ws0">Sumário </div><div class="t m0 x1 h2 y3e ff1 fs0 fc0 sc0 ls0 ws0">IDENTIFICAÇÃO DA E<span class="_ _0"></span>MPRESA ELABORA<span class="_ _0"></span>DORA DA AEP <span class="lsb">.............................................................................................</span> <span class="_ _b"></span>4 </div><div class="t m0 x1 h2 y3f ff1 fs0 fc0 sc0 ls0 ws0">HISTÓRICO DE REVIS<span class="_ _0"></span>ÕES <span class="_ _c"></span><span class="lsb">............................................................................................................................................<span class="ls0"> <span class="_ _b"></span>4 </span></span></div><div class="t m0 x1 h2 y40 ff1 fs0 fc0 sc0 ls0 ws0">IDENTIFICAÇÃO DA E<span class="_ _0"></span>MPRESA <span class="_ _d"></span><span class="lsb">....................................................................................................................................<span class="ls0"> <span class="_ _b"></span>5 </span></span></div><div class="t m0 x1 h2 y41 ff1 fs0 fc0 sc0 ls0 ws0">DESCRIÇÃO GERA<span class="_ _0"></span>L DA ORGANIZA<span class="_ _0"></span>ÇÃO <span class="lsb">......................................................................................................................</span> <span class="_ _b"></span>6 </div><div class="t m0 x1 h2 y42 ff1 fs0 fc0 sc0 ls0 ws0">INTRODUÇÃO <span class="_ _d"></span><span class="lsb">................................................................................................................................<span class="_ _2"></span>.............................<span class="ls0"> <span class="_ _b"></span>7 </span></span></div><div class="t m0 x1 h2 y43 ff1 fs0 fc0 sc0 ls0 ws0">OBJETIVOS <span class="_ _c"></span><span class="lsb">..................................................................................................................................................................<span class="ls0"> <span class="_ _b"></span>8 </span></span></div><div class="t m0 x1 h2 y44 ff1 fs0 fc0 sc0 ls0 ws0">MÉTODOS DE TRABA<span class="_ _0"></span>LHO <span class="_ _e"></span><span class="lsb">...........................................................................................................................................<span class="ls0"> <span class="_ _b"></span>9 </span></span></div><div class="t m0 x1 h2 y45 ff1 fs0 fc0 sc0 ls0 ws0">MATRIZ DE GRADUA<span class="_ _0"></span>ÇÃO DE RISCOS E<span class="_ _0"></span> PERIGOS <span class="_ _f"></span><span class="lsb">......................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">11<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y46 ff1 fs0 fc0 sc0 ls0 ws0">AVALIAÇÃO DAS SITUA<span class="_ _0"></span>ÇÕES DE TRABALH<span class="_ _0"></span>O <span class="_ _10"></span><span class="lsb">............................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">13<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y47 ff1 fs0 fc0 sc0 ls7 ws0">1.<span class="ls0"> <span class="_ _11"> </span>ALMOXARIFADO MANU<span class="_ _0"></span>TEN<span class="_ _0"></span>ÇÃO PRIMÁRIA <span class="_ _10"></span><span class="lsb">....................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">13<span class="ls0"> </span></span></span></span></span></div><div class="t m0 x1 h2 y48 ff1 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>LMOXARIF<span class="_ _0"></span>E JR.<span class="lsb">..........................................................................................................................</span> <span class="_ _b"></span><span class="ls7">13<span class="ls0"> </span></span></div><div class="t m0 x1 h2 y49 ff1 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>LMOXARIF<span class="_ _0"></span>E PL. <span class="_ _0"></span><span class="lsb">.........................................................................................................................<span class="ls0"> <span class="_ _f"></span><span class="ls7">17<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y4a ff1 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: ANA<span class="_ _0"></span>LISTA A<span class="_ _0"></span>DM MATERIAIS JR.<span class="_ _0"></span> <span class="_ _10"></span><span class="lsb">...................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">21<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y4b ff1 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: ANA<span class="_ _0"></span>LISTA A<span class="_ _0"></span>DM MATERIAIS SR.<span class="lsb">...................................................................................................</span> <span class="_ _f"></span><span class="ls7">23<span class="ls0"> </span></span></div><div class="t m0 x1 h2 y4c ff1 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: SE<span class="_ _0"></span>RVIÇOS GERAIS - LI<span class="_ _0"></span>MPEZA <span class="lsb">......................................................................................................</span> <span class="_ _b"></span><span class="ls7">25<span class="ls0"> </span></span></div><div class="t m0 x1 h2 y4d ff1 fs0 fc0 sc0 ls0 ws0">VALIDADE TÉCNICA <span class="_ _10"></span><span class="lsb">..................................................................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">28<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y4e ff1 fs0 fc0 sc0 ls0 ws0">CONCLUSÃO <span class="_ _d"></span><span class="lsb">.............................................................................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">29<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y4f ff1 fs0 fc0 sc0 ls0 ws0">REFERÊNCIAS BIBLIOGRÁ<span class="_ _0"></span>FICAS <span class="_ _d"></span><span class="lsb">................................................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">30<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h2 y50 ff1 fs0 fc0 sc0 ls0 ws0">DISPOSIÇÕES FINAIS<span class="_ _0"></span> <span class="_ _b"></span><span class="lsb">.................................................................................................................................................<span class="ls0"> <span class="_ _b"></span><span class="ls7">31<span class="ls0"> </span></span></span></span></div><div class="t m0 x1 h9 y51 ff2 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y52 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y53 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y54 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y55 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y56 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y57 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y58 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y59 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y5a ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y5b ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y5c ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y5d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><a class="l" href="#pf4" data-dest-detail='[4,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:726.750000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf4" data-dest-detail='[4,"XYZ",47,474,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:707.260000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf5" data-dest-detail='[5,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:687.770000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf6" data-dest-detail='[6,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:668.280000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf7" data-dest-detail='[7,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:648.790000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf8" data-dest-detail='[8,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:629.300000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf9" data-dest-detail='[9,"XYZ",232,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:609.810000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pfb" data-dest-detail='[11,"XYZ",47,764,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:590.320000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pfd" data-dest-detail='[13,"XYZ",68,519,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:570.830000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pfd" data-dest-detail='[13,"XYZ",68,503,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:551.340000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pfd" data-dest-detail='[13,"XYZ",68,476,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:531.850000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf11" data-dest-detail='[17,"XYZ",68,519,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:512.360000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf15" data-dest-detail='[21,"XYZ",68,519,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:492.860000px;width:507.200000px;height:19.500000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf17" data-dest-detail='[23,"XYZ",68,519,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:473.370000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf19" data-dest-detail='[25,"XYZ",68,519,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:453.880000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf1c" data-dest-detail='[28,"XYZ",47,766,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:434.390000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf1d" data-dest-detail='[29,"XYZ",47,766,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:414.900000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf1e" data-dest-detail='[30,"XYZ",47,766,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:395.410000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="#pf1f" data-dest-detail='[31,"XYZ",47,766,null]'><div class="d m2" style="border-style:none;position:absolute;left:47.400000px;bottom:375.920000px;width:507.200000px;height:19.490000px;background-color:rgba(255,255,255,0.000001);"></div></a></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf4" class="pf w0 h0" data-page-no="4"><div class="pc pc4 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/r7Drckx/amd-9.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">4 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x12 h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">IDENTIFICAÇÃ<span class="_ _0"></span>O DA EMPRESA E<span class="_ _0"></span>LABORADORA <span class="_ _0"></span>DA AEP </div><div class="t m0 x4 h16 y5f ff5 fsb fc0 sc0 ls0 ws0"> </div></div><div class="c x1b y60 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Razão Social:<span class="_ _0"></span> </div></div><div class="c x1c y60 wc h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">ERGOGROUP <span class="ff3">–</span> Se<span class="_ _0"></span>gurança do<span class="_ _0"></span> Trabalho Ltda. </div></div><div class="c x1b y61 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">CNPJ: </div></div><div class="c x1c y61 wd h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">21.135.906/000<span class="_ _0"></span>19 </div></div><div class="c x1d y61 we h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">I.E: </div></div><div class="c x1e y61 wf h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Isento </div></div><div class="c x1b y62 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Endereço: </div></div><div class="c x1c y62 wc h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Rua Santo Antôni<span class="_ _0"></span>o, <span class="lsc">nº</span>1<span class="lsd">45</span> </div></div><div class="c x1b y63 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Bairro:  </div></div><div class="c x1c y63 wd h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Centro </div></div><div class="c x1d y63 we h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">CEP: </div></div><div class="c x1e y63 wf h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">38010-160 </div></div><div class="c x1b y64 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Cidade: </div></div><div class="c x1c y64 wd h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Uberaba </div></div><div class="c x1d y64 we h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">UF: </div></div><div class="c x1e y64 wf h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">MG   </div></div><div class="c x1b y65 wb h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Telefone: </div></div><div class="c x1c y65 wd h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">(34) 3333-9987 </div></div><div class="c x1d y65 we h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">E-mail: </div></div><div class="c x1e y65 wf h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">contato@ergogr<span class="_ _0"></span>oup.com.br </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x4 h2 y66 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x1b y67 w10 h17"><div class="t m0 xc h9 y68 ff2 fs0 fc0 sc0 ls0 ws0">Responsável </div><div class="t m0 xc h9 y69 ff2 fs0 fc0 sc0 ls0 ws0">Técnico: </div></div><div class="c x1f y6a w11 h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Nome: </div></div><div class="c x20 y6a w12 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Amanda Viviane <span class="_ _0"></span>Muniz Rodrig<span class="_ _0"></span>ues </div></div><div class="c x1f y6b w11 h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Habilitação: </div></div><div class="c x20 y6b w12 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Fisioterapeuta <span class="_ _0"></span>/ Especialista e<span class="_ _0"></span>m Ergonomia </div></div><div class="c x1f y67 w11 h8"><div class="t m0 xc h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Registro: </div></div><div class="c x20 y67 w12 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">CREFITO 4/127<span class="_ _0"></span>866F </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h18 y6c ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y6d ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y6e ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y6f ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y70 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x21 h15 y71 ff4 fs0 fc1 sc0 ls0 ws0">HISTÓRICO DE REV<span class="_ _0"></span>ISÕES </div><div class="t m0 x4 h11 y72 ff1 fs9 fc0 sc0 ls0 ws0"> </div></div><div class="c x22 y73 w13 h19"><div class="t m0 xe h9 y74 ff2 fs0 fc0 sc0 ls0 ws0">REV. </div></div><div class="c x23 y73 w14 h19"><div class="t m0 x24 h9 y74 ff2 fs0 fc0 sc0 ls0 ws0">DATA </div></div><div class="c x25 y73 w15 h19"><div class="t m0 x26 h9 y1a ff2 fs0 fc0 sc0 ls0 ws0">Executado </div><div class="t m0 x27 h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">por: </div></div><div class="c x28 y73 w16 h19"><div class="t m0 x29 h9 y74 ff2 fs0 fc0 sc0 ls0 ws0">Verificado po<span class="_ _0"></span>r: </div></div><div class="c x2a y73 w17 h19"><div class="t m0 x24 h9 y75 ff2 fs0 fc0 sc0 ls0 ws0">DESCRIÇÃO E/OU FOLH<span class="_ _0"></span>AS AT<span class="_ _0"></span>INGIDAS </div></div><div class="c x22 y76 w13 h1a"><div class="t m0 x26 h2 y77 ff1 fs0 fc0 sc0 ls7 ws0">00<span class="ls0"> </span></div></div><div class="c x23 y76 w14 h1a"><div class="t m0 xc h2 y77 ff1 fs0 fc0 sc0 ls7 ws0">14<span class="ls0">/03/2023 </span></div></div><div class="c x25 y76 w15 h1a"><div class="t m0 x2b h2 y77 ff1 fs0 fc0 sc0 ls0 ws0">ERGOGROUP </div></div><div class="c x28 y76 w16 h1a"><div class="t m0 x29 h1b y78 ff8 fs4 fc0 sc0 ls0 ws0">Açúcar e Álcool </div><div class="t m0 x26 h1b y79 ff8 fs4 fc0 sc0 ls0 ws0">Oswaldo Ribeiro </div><div class="t m0 x2b h2 y7a ff8 fs4 fc0 sc0 ls0 ws0">de Mendonça Ltda<span class="_ _2"></span><span class="ff1 fs0"> </span></div></div><div class="c x2a y76 w17 h1a"><div class="t m0 x2b h2 y77 ff1 fs0 fc0 sc0 ls0 ws0">Emissão Inicial </div></div><div class="c x22 y7b w13 h1c"><div class="t m0 x2c h2 y7c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x23 y7b w14 h1c"><div class="t m0 x2d h2 y7c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x25 y7b w15 h1c"><div class="t m0 x3 h2 y7c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x28 y7b w16 h1c"><div class="t m0 x2e h2 y7c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x2a y7b w17 h1c"><div class="t m0 x2b h2 y7c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x22 y7d w13 h1d"><div class="t m0 x2c h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x23 y7d w14 h1d"><div class="t m0 x2d h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x25 y7d w15 h1d"><div class="t m0 x3 h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x28 y7d w16 h1d"><div class="t m0 x2e h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x2a y7d w17 h1d"><div class="t m0 x2b h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x22 y7f w13 h1d"><div class="t m0 x2c h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x23 y7f w14 h1d"><div class="t m0 x2d h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x25 y7f w15 h1d"><div class="t m0 x3 h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x28 y7f w16 h1d"><div class="t m0 x2e h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x2a y7f w17 h1d"><div class="t m0 x2b h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x22 y80 w13 h1d"><div class="t m0 x2c h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x23 y80 w14 h1d"><div class="t m0 x2d h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x25 y80 w15 h1d"><div class="t m0 x3 h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x28 y80 w16 h1d"><div class="t m0 x2e h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x2a y80 w17 h1d"><div class="t m0 x2b h2 y7e ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y81 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y82 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y83 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y84 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y85 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y86 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y87 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y88 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y89 ff1 fs9 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf5" class="pf w0 h0" data-page-no="5"><div class="pc pc5 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/YbYBKNS/amd-13.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">5 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x2f h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">IDENTIFICAÇÃ<span class="_ _0"></span>O DA EMPRESA </div><div class="t m0 x4 h2 y8a ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 y8b ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 y8c ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x30 y4a w18 h17"><div class="t m0 x2b h9 y8d ff2 fs0 fc0 sc0 ls0 ws0">Gestor do contrato:<span class="_ _0"></span> </div></div><div class="c x19 y8e w19 h1e"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Nome: </div></div><div class="c x31 y8e w1a h1e"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Valéria Cristina Lellis<span class="_ _0"></span> Jorge </div></div><div class="c x19 y8f w19 h1e"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Telefone: </div></div><div class="c x31 y8f w1a h1e"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">(17) 3330.3385 </div></div><div class="c x19 y4a w19 h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">E-mail: </div></div><div class="c x31 y4a w1a h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc4 sc0 ls0 ws0">valeria.jorge@c<span class="_ _0"></span>olorado.com.br<span class="fc0"> <span class="_ _0"></span> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x4 h2 y90 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y91 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y92 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y93 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y94 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y95 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y96 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y97 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y54 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y98 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y99 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9a ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9b ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9c ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9d ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9e ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y9f ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ya0 ff1 fs9 fc0 sc0 ls0 ws0"> </div></div><div class="c x30 ya1 w1b h1f"><div class="t m0 x2b h20 ya2 ff2 fs9 fc0 sc0 ls0 ws0">Razão Social:<span class="fs0"> </span></div></div><div class="c x12 ya1 w1c h1f"><div class="t m0 x2b h2 ya3 ff1 fs0 fc0 sc0 ls0 ws0">Açúcar e Álcool Oswald<span class="_ _0"></span>o Ribeiro de<span class="_ _0"></span> Mendonça Ltda.<span class="_ _0"></span> </div></div><div class="c x30 ya4 w1b h1f"><div class="t m0 x2b h20 ya2 ff2 fs9 fc0 sc0 ls0 ws0">Nome Fantasia:<span class="fs0"> </span></div></div><div class="c x12 ya4 w1c h1f"><div class="t m0 x2b h2 ya3 ff1 fs0 fc0 sc0 ls0 ws0">Usina Colorado </div></div><div class="c x30 ya5 w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">CNPJ: </div></div><div class="c x12 ya5 w1d h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">51.990.778/000<span class="_ _0"></span>1-<span class="lsd">26</span> </div></div><div class="c x32 ya5 w1e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">I.E: </div></div><div class="c x33 ya5 w1f h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">322009110112 </div></div><div class="c x30 ya6 w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Endereço: </div></div><div class="c x12 ya6 w1c h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Fazenda São José da<span class="_ _0"></span> Glória </div></div><div class="c x30 ya7 w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Bairro:  </div></div><div class="c x12 ya7 w1d h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Zona Rural </div></div><div class="c x32 ya7 w1e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">CEP: </div></div><div class="c x33 ya7 w1f h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">14.790-000. </div></div><div class="c x30 ya8 w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Cidade: </div></div><div class="c x12 ya8 w1d h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">Guaíra </div></div><div class="c x32 ya8 w1e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">UF: </div></div><div class="c x33 ya8 w1f h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 lse ws0">SP<span class="ls0"> </span></div></div><div class="c x30 ya9 w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Telefone: </div></div><div class="c x12 ya9 w1d h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">017 3330-3385 </div></div><div class="c x32 ya9 w1e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">E-mail: </div></div><div class="c x33 ya9 w1f h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0"> <span class="ff1 fc4">valeria.jorge@col<span class="_ _0"></span>orado.com.br<span class="_ _0"></span><span class="fc0"> </span></span></div></div><div class="c x30 yaa w1b h7"><div class="t m0 x2b h9 y1a ff2 fs0 fc0 sc0 ls0 ws0">Ramo de </div><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Atividade: </div></div><div class="c x12 yaa w1d h7"><div class="t m0 x2b h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">Produção de Álc<span class="_ _0"></span>ool </div></div><div class="c x32 yaa w20 h7"><div class="t m0 x2b h9 y1a ff2 fs0 fc0 sc0 ls0 ws0">Atividade </div><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Principal: </div></div><div class="c x34 yaa w21 h7"><div class="t m0 x2b h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">Produção de Açúcar,<span class="_ _0"></span> Álcool </div><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">e Energia Elétric<span class="_ _0"></span>a. </div></div><div class="c x30 yab w1b h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">CNAE:  </div></div><div class="c x12 yab w1d h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">19.31-4-<span class="ls7">00</span> </div></div><div class="c x32 yab w20 h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc0 sc0 ls0 ws0">Grau de Risco: </div></div><div class="c x34 yab w21 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">3 </div></div><a class="l" href="mailto:valeria.jorge@colorado.com.br"><div class="d m2" style="border-style:none;position:absolute;left:251.050000px;bottom:502.020000px;width:143.760000px;height:13.420000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="mailto:valeria.jorge@colorado.com.br"><div class="d m2" style="border-style:none;position:absolute;left:361.710000px;bottom:630.560000px;width:143.760000px;height:13.430000px;background-color:rgba(255,255,255,0.000001);"></div></a></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf6" class="pf w0 h0" data-page-no="6"><div class="pc pc6 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/vPdDsFy/amd-20.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">6 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x35 h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">DESCRIÇÃO GERA<span class="_ _0"></span>L DA ORGANIZA<span class="_ _0"></span>ÇÃO </div><div class="t m0 x36 h21 yac ff5 fsc fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h2 yad ff1 fs0 fc0 sc0 ls0 ws0">O <span class="_ _9"></span>Grupo <span class="_ _9"></span>Colorado <span class="_ _9"></span>é <span class="_ _9"></span>uma <span class="_ _6"></span>empresa <span class="_ _9"></span>brasileira, <span class="_ _9"></span>fundada <span class="_ _6"></span>em <span class="_ _9"></span>1963 <span class="_ _9"></span>por <span class="_ _9"></span>Oswaldo <span class="_ _9"></span>Ribeiro <span class="_ _9"></span>de <span class="_ _9"></span>Mendonça. <span class="_ _6"></span>As </div><div class="t m0 x1 h2 yae ff1 fs0 fc0 sc0 ls0 ws0">primeiras atividades produtivas estão ligadas <span class="_ _2"></span>à pecuária e <span class="_ _2"></span>às <span class="_ _2"></span>culturas de m<span class="_ _2"></span>ilho, soja e <span class="_ _2"></span>algodão. Em 1970, <span class="_ _2"></span>passou<span class="_ _0"></span> </div><div class="t m0 x1 h2 yaf ff1 fs0 fc0 sc0 ls0 ws0">a <span class="_ _6"></span>processar <span class="_ _7"></span>sementes <span class="_ _6"></span>melhoradas, <span class="_ _7"></span>atingindo <span class="_ _6"></span>projeção <span class="_ _6"></span>nacional, <span class="_ _7"></span>com <span class="_ _9"></span>a <span class="_ _6"></span>produçã<span class="_ _0"></span>o <span class="_ _6"></span>de <span class="_ _6"></span>sementes <span class="_ _6"></span>de <span class="_ _6"></span>capim, <span class="_ _7"></span>soja, </div><div class="t m0 x1 h2 yb0 ff1 fs0 fc0 sc0 ls0 ws0">milho <span class="_ _0"></span>híbrido <span class="_ _12"></span>e <span class="_ _0"></span>produtos<span class="_ _0"></span> <span class="_ _12"></span>especiais. <span class="_ _0"></span>Data <span class="_ _12"></span>da década <span class="_ _12"></span>de <span class="_ _12"></span>70 <span class="_ _0"></span>a <span class="_ _12"></span>criação <span class="_ _12"></span>de u<span class="_ _0"></span>m <span class="_ _0"></span>centro <span class="_ _12"></span>de <span class="_ _0"></span>pesquisa, <span class="_ _12"></span>de <span class="_ _12"></span>cará<span class="_ _2"></span>ter <span class="_ _12"></span>pioneiro, </div><div class="t m0 x1 h2 ya8 ff1 fs0 fc0 sc0 ls0 ws0">dedicado <span class="_ _2"></span>à melhoria <span class="_ _2"></span>genética de <span class="_ _2"></span>vegetais. <span class="_ _2"></span>Em 1979, <span class="_ _2"></span>passou <span class="_ _2"></span>a <span class="_ _2"></span>atuar no <span class="_ _2"></span>segmento <span class="_ _2"></span>alcooleiro. A <span class="_ _2"></span>primeira <span class="_ _2"></span>safra da </div><div class="t m0 x1 h2 yb1 ff1 fs0 fc0 sc0 ls0 ws0">então <span class="_ _0"></span>Destilaria <span class="_ _12"></span>Colorado, l<span class="_ _12"></span>o<span class="_ _2"></span>calizada <span class="_ _12"></span>no mun<span class="_ _0"></span>icípio d<span class="_ _0"></span>e <span class="_ _12"></span>Guaíra, ac<span class="_ _0"></span>onteceu <span class="_ _0"></span>no <span class="_ _12"></span>ano de <span class="_ _0"></span>1982. <span class="_ _12"></span>A partir <span class="_ _12"></span>de 1991<span class="_ _0"></span>, p<span class="_ _0"></span>assou </div><div class="t m0 x1 h2 yb2 ff1 fs0 fc0 sc0 ls0 ws0">a produzir açúcar, <span class="_ _2"></span>tornand<span class="_ _12"></span>o<span class="_ _2"></span>-se Usina Colorado. Em 2008, ampliou o<span class="_ _2"></span> seu parque industrial e atingiu a capacidade </div><div class="t m0 x1 h2 yb3 ff1 fs0 fc0 sc0 ls0 ws0">de processa<span class="_ _0"></span>mento de <span class="_ _12"></span>7,5 milhões d<span class="_ _0"></span>e tonel<span class="_ _0"></span>adas de c<span class="_ _12"></span>ana-<span class="lsc">de</span>-açúcar. Figura entre<span class="_ _0"></span> <span class="_ _0"></span>as maiores<span class="_ _0"></span> unidad<span class="_ _0"></span>es do set<span class="_ _0"></span>or em<span class="_ _0"></span> </div><div class="t m0 x1 h2 yb4 ff1 fs0 fc0 sc0 ls0 ws0">volume <span class="_ _6"></span>de <span class="_ _7"></span>moagem. <span class="_ _6"></span>Também <span class="_ _7"></span>em <span class="_ _6"></span>2008, <span class="_ _6"></span>o <span class="_ _6"></span>Grupo <span class="_ _6"></span>Colorado <span class="_ _6"></span>aume<span class="_ _2"></span>ntou <span class="_ _7"></span>a <span class="_ _6"></span>capacidade <span class="_ _7"></span>instalada <span class="_ _6"></span>de <span class="_ _6"></span>geração <span class="_ _7"></span>para </div><div class="t m0 x1 h2 yb5 ff1 fs0 fc0 sc0 ls0 ws0">52,76 MW de energ<span class="_ _0"></span>ia elétri<span class="_ _0"></span>ca a partir da bio<span class="_ _0"></span>massa da cana. Part<span class="_ _0"></span>e desta energ<span class="_ _0"></span>ia elétrica é c<span class="_ _0"></span>omercializada. </div><div class="t m0 x36 h18 yb6 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yb7 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yb8 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yb9 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yba ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 ybb ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 ybc ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 ybd ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 ybe ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 ybf ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc0 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc1 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 y33 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc2 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc3 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc4 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc5 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc6 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x37 h22 yc7 ff1 fs5 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf7" class="pf w0 h0" data-page-no="7"><div class="pc pc7 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/Hq0RYFn/amd-14.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">7 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x38 h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">INTRODUÇÃO </div><div class="t m0 x4 h23 yc8 ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h2 yc9 ff1 fs0 fc0 sc0 ls0 ws0">A Ergon<span class="_ _0"></span>omia <span class="_ _0"></span>é o <span class="_ _12"></span>estudo da <span class="_ _12"></span>adaptação do trabalh<span class="_ _12"></span>o ao h<span class="_ _0"></span>omem (VI<span class="_ _12"></span>EIRA, 2000; <span class="_ _0"></span>IIDA, <span class="_ _12"></span>2000). Foi d<span class="_ _0"></span>efinida <span class="_ _12"></span>como </div><div class="t m0 x1 h2 yca ff9 fs0 fc0 sc0 ls0 ws0">“o <span class="_ _13"> </span>conjunto <span class="_ _a"> </span>de <span class="_ _13"> </span>conhecim<span class="_ _0"></span>entos <span class="_ _a"> </span>científicos <span class="_ _13"> </span>relati<span class="_ _0"></span>vos <span class="_ _a"> </span>ao <span class="_"> </span>ho<span class="_ _0"></span>mem <span class="_ _a"> </span>e <span class="_"> </span>n<span class="_ _0"></span>ecessários <span class="_ _a"> </span>à <span class="_ _13"> </span>concepção <span class="_ _a"> </span>de <span class="_ _13"> </span>instrume<span class="_ _0"></span>ntos, </div><div class="t m0 x1 h2 ycb ff1 fs0 fc0 sc0 ls0 ws0">máquinas <span class="_ _2"></span>e dispositivos <span class="_ _2"></span>que <span class="_ _2"></span>possam ser <span class="_ _2"></span>utilizados <span class="_ _2"></span><span class="ff9">com <span class="_ _2"></span>o <span class="_ _2"></span>máximo <span class="_ _2"></span>de <span class="_ _2"></span>conf<span class="_ _0"></span>orto, <span class="_ _2"></span>segurança e <span class="_ _2"></span>eficiência” <span class="_ _2"></span>(LAVILLE<span class="_ _0"></span>, </span></div><div class="t m0 x1 h2 ycc ff1 fs0 fc0 sc0 ls0 ws0">1977). O termo ergonomia formad<span class="_ _0"></span>o pelas palavras do grego ergon (trabalh<span class="_ _0"></span>o) e nomos (regras, leis), foi proposto </div><div class="t m0 x1 h2 ycd ff1 fs0 fc0 sc0 ls0 ws0">em <span class="_ _2"></span>1857 <span class="_ _2"></span>pelo <span class="_ _7"></span>naturalis<span class="_ _12"></span>ta <span class="_ _7"></span>polonê<span class="_ _0"></span>s <span class="_ _2"></span>Woiitej <span class="_ _2"></span>Yastembowski, <span class="_ _2"></span>usado <span class="_ _2"></span>pela <span class="_ _7"></span>pri<span class="_ _12"></span>m<span class="_ _2"></span>eira <span class="_ _2"></span>vez <span class="_ _2"></span>em <span class="_ _2"></span>194<span class="_ _2"></span>9 <span class="_ _2"></span>pelo <span class="_ _7"></span>ing<span class="_ _0"></span>lês <span class="_ _2"></span>Murrel <span class="_ _2"></span>e </div><div class="t m0 x1 h2 yce ff1 fs0 fc0 sc0 ls0 ws0">adotado oficialmente<span class="_ _0"></span> nesse mes<span class="_ _0"></span>mo ano pela Erg<span class="_ _0"></span>onomics Research S<span class="_ _0"></span>ociety, da Ing<span class="_ _0"></span>laterra.  </div><div class="t m0 x36 h2 ycf ff1 fs0 fc0 sc0 ls0 ws0">Este Docum<span class="_ _0"></span>ento foi <span class="_ _12"></span>elaborado de acordo <span class="_ _12"></span>com as diret<span class="_ _0"></span>rizes da <span class="_ _0"></span>NR 17, <span class="_ _0"></span>Portaria <span class="_ _0"></span>MTP <span class="_ _0"></span>n° 423, <span class="_ _0"></span>de 7 <span class="_ _0"></span>de outub<span class="_ _0"></span>ro </div><div class="t m0 x1 h2 yd0 ff1 fs0 fc0 sc0 ls0 ws0">de <span class="_ _7"></span>2021<span class="_ _0"></span>, <span class="_ _7"></span>DOU <span class="_ _2"></span>07/10/2021 <span class="_ _2"></span>e <span class="_ _7"></span>suas <span class="_ _7"></span>rela<span class="_ _0"></span>ções <span class="_ _7"></span>para <span class="_ _2"></span>com <span class="_ _2"></span>a <span class="_ _7"></span>NR <span class="_ _7"></span>01, <span class="_ _2"></span>Portaria <span class="_ _2"></span>SEPRT <span class="_ _7"></span>n° <span class="_ _2"></span>6.730, <span class="_ _7"></span>de <span class="_ _2"></span>9 <span class="_ _7"></span>de <span class="_ _2"></span>m<span class="_ _2"></span>arço <span class="_ _2"></span>de <span class="_ _7"></span>2020,<span class="_ _0"></span> </div><div class="t m0 x1 h2 yd1 ff1 fs0 fc0 sc0 ls0 ws0">DOU 12/03/202<span class="_ _0"></span>0. </div><div class="t m0 x36 h2 yd2 ff1 fs0 fc0 sc0 ls0 ws0">Conforme i<span class="_ _12"></span>tem 1.5.3.2.1 <span class="_ _0"></span>da <span class="_ _0"></span>NR-<span class="lsd">01 </span><span class="ffa">“A organ<span class="_ _0"></span>ização <span class="_ _0"></span>deve co<span class="_ _0"></span>nsiderar<span class="_ _0"></span> as <span class="_ _12"></span>condições de <span class="_ _0"></span>trabalho, <span class="_ _12"></span>nos termos<span class="_ _0"></span> da<span class="_ _0"></span> </span></div><div class="t m0 x1 h24 yd3 ffb fs0 fc0 sc0 lsf ws0">NR<span class="ls0">-<span class="ffa">17”.</span> </span></div><div class="t m0 x36 h2 yd4 ff1 fs0 fc0 sc0 ls0 ws0">Conforme <span class="_ _a"> </span>item <span class="_ _a"> </span>17<span class="_ _2"></span>.3.1 <span class="_ _a"> </span>da <span class="_ _a"> </span>NR<span class="_ _2"></span>-<span class="ff9">17 <span class="_ _13"> </span>“<span class="ffb">A <span class="_ _a"> </span>organização <span class="_ _a"> </span>deve <span class="_ _13"> </span>realizar <span class="_ _a"> </span>a<span class="ffc"> <span class="_"> </span></span>avaliaçã<span class="_ _0"></span>o <span class="_ _13"> </span>erg<span class="_ _0"></span>onômica <span class="_ _a"> </span>preliminar <span class="_ _13"> </span>das </span></span></div><div class="t m0 x1 h24 yd5 ffb fs0 fc0 sc0 ls0 ws0">situações <span class="_ _10"></span>de <span class="_ _12"></span>tr<span class="_ _2"></span>abalho <span class="_ _10"></span>que, <span class="_ _12"></span>em <span class="_ _12"></span>decorrência <span class="_ _10"></span>da <span class="_ _12"></span>natureza <span class="_ _12"></span>e <span class="_ _12"></span>conteúdo <span class="_ _10"></span>das <span class="_ _12"></span>atividades <span class="_ _12"></span>requeridas, <span class="_ _12"></span>demanda <span class="_ _10"></span>adaptação </div><div class="t m0 x1 h24 yd6 ffb fs0 fc0 sc0 ls0 ws0">às <span class="_"> </span>características <span class="_"> </span>psicofi<span class="_ _12"></span>siológicas <span class="_"> </span>dos <span class="_"> </span>trabalhadores, <span class="_"> </span>a <span class="_"> </span>fim <span class="_"> </span>de <span class="_"> </span>subsidiar <span class="_"> </span>a <span class="_"> </span>i<span class="_ _0"></span>mplementação <span class="_"> </span>das <span class="_"> </span>medid<span class="_ _12"></span>as <span class="_"> </span>de </div><div class="t m0 x1 h2 yd7 ffb fs0 fc0 sc0 ls0 ws0">prevenção e adequaçõ<span class="_ _0"></span>es necessária<span class="_ _0"></span>s previstas nesta <span class="_ _0"></span>NR<span class="ff9">”. <span class="ff1"> </span></span></div><div class="t m0 x36 h2 yd8 ff1 fs0 fc0 sc0 ls0 ws0">As informações <span class="_ _2"></span>apresentad<span class="_ _0"></span>as neste <span class="_ _2"></span>documento, descrevem <span class="_ _2"></span>uma <span class="_ _2"></span>avaliação <span class="_ _2"></span>das condições <span class="_ _2"></span>ergonômicas de </div><div class="t m0 x1 h2 yd9 ff1 fs0 fc0 sc0 ls0 ws0">trabalho <span class="_ _2"></span>para <span class="_ _2"></span>composiçã<span class="_ _0"></span>o <span class="_ _2"></span>do <span class="_ _2"></span>Gerenciamento de <span class="_ _2"></span>Riscos Ocupacionais <span class="_ _2"></span><span class="ff9">–</span> <span class="_ _2"></span>GRO <span class="_ _2"></span>que <span class="_ _2"></span>deve <span class="_ _2"></span>constituir o<span class="_ _2"></span> <span class="_ _2"></span>Inventário de </div><div class="t m0 x1 h2 yda ff1 fs0 fc0 sc0 ls0 ws0">Riscos Ergonô<span class="_ _0"></span>micos e compor o Pr<span class="_ _0"></span>ograma de Ger<span class="_ _0"></span>enciament<span class="_ _0"></span>o de Riscos <span class="ff9">–</span> PGR, no que tang<span class="_ _0"></span>e em: </div><div class="t m0 x39 h25 ydb ffb fs0 fc0 sc0 ls7 ws0">1)<span class="ffd ls0"> <span class="_ _14"> </span><span class="ffb">Identificar o Perigo <span class="_ _0"></span>(ou fator de <span class="_ _0"></span>risco) e possíveis le<span class="_ _0"></span>sões ou agravos<span class="_ _0"></span> à saúde; </span></span></div><div class="t m0 x39 h25 ydc ffb fs0 fc0 sc0 ls7 ws0">2)<span class="ffd ls0"> <span class="_ _14"> </span><span class="ffb">Avaliar os riscos ocupa<span class="_ _0"></span>cionais indic<span class="_ _0"></span>ando o nível de risco; </span></span></div><div class="t m0 x39 h25 ydd ffb fs0 fc0 sc0 ls7 ws0">3)<span class="ffd ls0"> <span class="_ _14"> </span><span class="ffb">Classificar <span class="_ _6"></span>os <span class="_ _8"> </span>riscos <span class="_ _9"> </span>ocupacion<span class="_ _0"></span>ais <span class="_ _9"> </span>para <span class="_ _9"> </span>determinar <span class="_ _9"></span>a <span class="_ _9"></span>necessidade <span class="_ _9"></span>de <span class="_ _9"></span>adoção <span class="_ _6"></span>de <span class="_ _9"> </span>medidas <span class="_ _9"> </span>de </span></span></div><div class="t m0 x3a h24 yde ffb fs0 fc0 sc0 ls0 ws0">prevenção; </div><div class="t m0 x39 h25 ydf ffb fs0 fc0 sc0 ls7 ws0">4)<span class="ffd ls0"> <span class="_ _14"> </span><span class="ffb">Acompanhar o con<span class="_ _0"></span>trole dos riscos<span class="_ _0"></span> ocupacion<span class="_ _0"></span>ais </span></span></div><div class="t m0 x1 h26 y58 ffe fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ye0 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ye1 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ye2 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ye3 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 ye4 ff1 fs9 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf8" class="pf w0 h0" data-page-no="8"><div class="pc pc8 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/Hq0RYFn/amd-14.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">8 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x3b h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">OBJETIVOS </div><div class="t m0 x36 h23 yc8 ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h2 yc9 ff1 fs0 fc0 sc0 ls0 ws0">Esta <span class="_ _2"></span>Avaliaçã<span class="_ _0"></span>o <span class="_ _2"></span>Ergon<span class="_ _0"></span>ômica Preliminar tem como <span class="_ _2"></span>principal objetivo realizar o <span class="_ _2"></span>levantamento<span class="_ _0"></span> preliminar <span class="_ _2"></span>dos </div><div class="t m0 x1 h2 yca ff1 fs0 fc0 sc0 ls0 ws0">perigos <span class="_ _15"> </span>e <span class="_ _15"> </span>riscos <span class="_ _15"> </span>ergonô<span class="_ _0"></span>micos <span class="_ _15"> </span>presentes <span class="_ _15"> </span>nas <span class="_ _15"> </span>dife<span class="_ _0"></span>rentes <span class="_ _15"> </span>atividades <span class="_ _15"> </span>de <span class="_ _15"> </span>tra<span class="_ _0"></span>balho, <span class="_ _15"> </span>sob <span class="_ _15"> </span>a <span class="_ _15"> </span>perspectiva<span class="_ _0"></span>s <span class="_ _15"> </span>dos </div><div class="t m0 x1 h2 ycb ff1 fs0 fc0 sc0 ls0 ws0">conhecimentos <span class="_ _7"></span>da <span class="_ _7"></span>ergonomia, <span class="_ _7"></span>e <span class="_ _7"></span>está <span class="_ _7"></span>est<span class="_ _2"></span>ruturad<span class="_ _0"></span>o <span class="_ _7"></span>a <span class="_ _6"></span>partir <span class="_ _6"></span>dos <span class="_ _7"></span>métodos <span class="_ _7"></span>descritos <span class="_ _6"></span>neste <span class="_ _7"></span>documento <span class="_ _7"></span>e <span class="_ _7"></span>seguidos </div><div class="t m0 x1 h2 ycc ff1 fs0 fc0 sc0 ls0 ws0">pela <span class="_ _6"></span>empresa <span class="_ _6"></span>ERGOGROUP®, <span class="_ _9"></span>que <span class="_ _6"></span>oferece <span class="_ _9"></span>uma <span class="_ _6"></span>metodologia <span class="_ _7"></span>sistematizada <span class="_ _6"></span>de <span class="_ _9"></span>reconhecimento <span class="_ _6"></span>dos <span class="_ _6"></span>perigos <span class="_ _6"></span>de </div><div class="t m0 x1 h2 ycd ff1 fs0 fc0 sc0 ls0 ws0">natureza ergonô<span class="_ _0"></span>mica, avaliação e clas<span class="_ _12"></span>sificação dos riscos associados. </div><div class="t m0 x36 h2 ye5 ff1 fs0 fc0 sc0 ls0 ws0">Ao mesmo te<span class="_ _0"></span>mpo, destac<span class="_ _0"></span>a-se que este<span class="_ _0"></span> relatório não<span class="_ _0"></span> substitui a<span class="_ _12"></span> AET, que deverá <span class="_ _0"></span>ser elaborada<span class="_ _0"></span> conforme o<span class="_ _0"></span> </div><div class="t m0 x1 h2 ycf ff1 fs0 fc0 sc0 ls0 ws0">descrito na NR-17.3.<span class="_ _0"></span>3. </div><div class="t m0 x36 h2 ye6 ff1 fs0 fc0 sc0 ls0 ws0">Reforça-se <span class="_ _9"></span>ainda, <span class="_ _9"></span>que <span class="_ _9"></span>a <span class="_ _8"> </span>AEP <span class="_ _9"></span>é <span class="_ _8"> </span>um <span class="_ _9"></span>estudo <span class="_ _9"></span>de <span class="_ _9"></span>identificação <span class="_ _9"></span>de<span class="_ _2"></span> <span class="_ _9"></span>perigos <span class="_ _9"></span>e <span class="_ _8"></span>avaliação <span class="_ _9"></span>de <span class="_ _9"></span>risco, <span class="_ _9"></span>produzindo </div><div class="t m0 x1 h2 ye7 ff1 fs0 fc0 sc0 ls0 ws0">indicadores <span class="_ _2"></span>de <span class="_ _7"></span>reconheci<span class="_ _0"></span>mento <span class="_ _7"></span>da<span class="_ _12"></span>s <span class="_ _7"></span>condições <span class="_ _2"></span>ergonômicas <span class="_ _2"></span>de <span class="_ _7"></span>trabalh<span class="_ _0"></span>o <span class="_ _7"></span>e <span class="_ _2"></span>que <span class="_ _7"></span>deverã<span class="_ _0"></span>o <span class="_ _2"></span>ser <span class="_ _7"></span>contemplad<span class="_ _0"></span>os <span class="_ _7"></span>ju<span class="_ _0"></span>nto </div><div class="t m0 x1 h2 yd2 ff1 fs0 fc0 sc0 ls0 ws0">às determinantes do Gerenciamento de Riscos Ocupacionais (GRO) e seu delineamento no tocante <span class="_ _2"></span>do Programa<span class="_ _0"></span> </div><div class="t m0 x1 h2 yd3 ff1 fs0 fc0 sc0 ls0 ws0">de <span class="_ _7"></span>Gerenciamento <span class="_ _7"></span>de <span class="_ _6"></span>Riscos <span class="_ _7"></span>(PGR), <span class="_ _7"></span>a <span class="_ _6"></span>fim <span class="_ _7"></span>de <span class="_ _7"></span>co<span class="_ _2"></span>nstitu<span class="_ _12"></span>ir <span class="_ _6"></span>o <span class="_ _6"></span>Inventário <span class="_ _7"></span>de <span class="_ _7"></span>Riscos <span class="_ _6"></span>e <span class="_ _7"></span>os <span class="_ _6"></span>determinantes <span class="_ _7"></span>do <span class="_ _7"></span>Plano <span class="_ _7"></span>de </div><div class="t m0 x1 h2 ye8 ff1 fs0 fc0 sc0 ls0 ws0">Ação, a serem gerencia<span class="_ _0"></span>dos pela e<span class="_ _0"></span>mpresa<span class="ff5">. </span></div><div class="t m0 x36 h18 ye9 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yea ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yeb ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yec ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yed ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 ydb ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yee ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yef ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf0 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf1 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf2 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf3 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf4 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 yf5 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf9" class="pf w0 h0" data-page-no="9"><div class="pc pc9 w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/Hq0RYFn/amd-14.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls0 ws0">9 </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x21 h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">MÉTODOS DE TRABA<span class="_ _12"></span>L<span class="_ _2"></span>HO </div><div class="t m0 x4 h23 yf6 ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h2 yf7 ff1 fs0 fc0 sc0 ls0 ws0">O método utilizado nesse serviço tem como base as abordagens preconizad<span class="_ _0"></span>as na NR01 (Portaria SEPRT<span class="_ _0"></span> </div><div class="t m0 x1 h2 yf8 ff1 fs0 fc0 sc0 ls0 ws0">n.º 6.730, de 09 d<span class="_ _0"></span>e março d<span class="_ _0"></span>e 2020), NR17 (P<span class="_ _0"></span>ortaria/MTP Nº <span class="_ _0"></span>423, de 7 de <span class="_ _0"></span>outubro de 2<span class="_ _0"></span>021). </div><div class="t m0 x4 h2 yf9 ff1 fs0 fc0 sc0 ls0 ws0">A <span class="_ _15"> </span>Ergon<span class="_ _0"></span>omia <span class="_ _15"> </span>é<span class="_ _12"></span> <span class="_ _15"> </span>uma <span class="_ _15"> </span>important<span class="_ _0"></span>e <span class="_ _15"> </span>ferra<span class="_ _12"></span>m<span class="_ _2"></span>enta <span class="_ _15"> </span>p<span class="_ _0"></span>ara <span class="_ _15"> </span>prevenir <span class="_ _4"> </span>e <span class="_ _15"> </span>solucionar<span class="_ _0"></span> <span class="_ _15"> </span>o <span class="_ _16"> </span>quadro <span class="_ _16"> </span>de <span class="_ _16"> </span>doenças<span class="_ _12"></span> </div><div class="t m0 x1 h2 yfa ff1 fs0 fc0 sc0 ls0 ws0">ocupacionais e perda<span class="_ _0"></span>s na produtividade<span class="_ _12"></span> das organizações.  </div><div class="t m0 x4 h2 yfb ff1 fs0 fc0 sc0 ls0 ws0">A <span class="_ _12"></span>análise d<span class="_ _12"></span>o<span class="_ _2"></span>s <span class="_ _12"></span>dados <span class="_ _0"></span>coletad<span class="_ _0"></span>os <span class="_ _12"></span>permite <span class="_ _0"></span>a <span class="_ _12"></span>identificação <span class="_ _12"></span>dos <span class="_ _12"></span>aspectos <span class="_ _12"></span>ergonômicos <span class="_ _12"></span>citados n<span class="_ _12"></span>este rela<span class="_ _12"></span>tó<span class="_ _2"></span>rio, </div><div class="t m0 x1 h2 yfc ff1 fs0 fc0 sc0 ls0 ws0">objetivando <span class="_ _9"></span>a <span class="_ _9"></span>adequação <span class="_ _6"></span>às <span class="_ _8"> </span>exigências <span class="_ _9"></span>legais, <span class="_ _9"></span>além <span class="_ _6"></span>das <span class="_ _8"> </span>exigências <span class="_ _9"></span>de <span class="_ _9"></span>conforto, <span class="_ _9"></span>segurança <span class="_ _9"></span>e <span class="_ _9"></span>de <span class="_ _9"></span>desempenho </div><div class="t m0 x1 h2 yfd ff1 fs0 fc0 sc0 ls0 ws0">eficiente. <span class="_ _a"> </span>Os <span class="_ _a"> </span>aspectos <span class="_ _a"> </span>ergonômicos <span class="_ _8"> </span>observados <span class="_ _a"> </span>foram <span class="_ _a"> </span>priorizados, <span class="_ _8"> </span>entretanto, <span class="_ _8"> </span>dentro <span class="_ _13"> </span>dos <span class="_ _a"> </span>limites <span class="_ _8"> </span>temporais </div><div class="t m0 x1 h2 yfe ff1 fs0 fc0 sc0 ls0 ws0">definidos para a avalia<span class="_ _12"></span>ção de cada cargo. </div><div class="t m0 x4 h2 y6e ff1 fs0 fc0 sc0 ls0 ws0">Para <span class="_"> </span>esse <span class="_"> </span>trabalho, <span class="_"> </span>iremos <span class="_"> </span>utilizar <span class="_"> </span>uma <span class="_"> </span>abordagem<span class="_ _0"></span> <span class="_"> </span>participativa <span class="_"> </span>dos <span class="_"> </span>trabalhadores, <span class="_"> </span>em<span class="_ _2"></span> <span class="_"> </span>todos <span class="_"> </span>os </div><div class="t m0 x1 h2 yff ff1 fs0 fc0 sc0 ls0 ws0">momentos da <span class="_ _2"></span>intervenção ergonômica. <span class="_ _2"></span>Entende-se que <span class="_ _2"></span>se <span class="_ _2"></span>as pessoas <span class="_ _2"></span>da <span class="_ _2"></span>organização participarem das <span class="_ _2"></span>tomadas<span class="_ _0"></span> </div><div class="t m0 x1 h2 y100 ff1 fs0 fc0 sc0 ls0 ws0">de decisão, <span class="_ _2"></span>elas são <span class="_ _2"></span>capazes de <span class="_ _2"></span>experienciar a <span class="_ _2"></span>utilização das <span class="_ _2"></span>suas habilidades, fornecendo <span class="_ _2"></span>a elas <span class="_ _2"></span>um sentimento </div><div class="t m0 x1 h2 y101 ff1 fs0 fc0 sc0 ls0 ws0">de <span class="_"> </span>responsabilidade <span class="_"> </span>e <span class="_"> </span>comprometim<span class="_ _0"></span>ento <span class="_"> </span>com <span class="_"> </span>a <span class="_"> </span>organiz<span class="_ _0"></span>ação. <span class="_"> </span>Para <span class="_"> </span>tal, <span class="_"> </span>será <span class="_"> </span>criado <span class="_"> </span>um <span class="_"> </span>grupo <span class="_"> </span>de <span class="_"> </span>trabalh<span class="_ _0"></span>o, </div><div class="t m0 x1 h2 y102 ff1 fs0 fc0 sc0 ls0 ws0">denominado <span class="_ _2"></span>Comitê <span class="_ _7"></span>de <span class="_ _2"></span>Ergonomia <span class="_ _7"></span>(COERGO),<span class="_ _12"></span> <span class="_ _7"></span>o <span class="_ _7"></span>qual <span class="_ _7"></span>ficará<span class="_ _12"></span> <span class="_ _7"></span>responsável <span class="_ _7"></span>por<span class="_ _0"></span> <span class="_ _7"></span>auxiliar<span class="_ _0"></span> <span class="_ _7"></span>na <span class="_ _7"></span>i<span class="_ _0"></span>mplantação <span class="_ _2"></span>do <span class="_ _7"></span>p<span class="_ _2"></span>rojeto<span class="_ _0"></span> </div><div class="t m0 x1 h2 y103 ff1 fs0 fc0 sc0 ls0 ws0">dentro da empresa.<span class="_ _0"></span> </div><div class="t m0 x4 h2 y104 ff1 fs0 fc0 sc0 ls0 ws0">A Avaliaçã<span class="_ _0"></span>o Ergon<span class="_ _0"></span>ômica <span class="_ _0"></span>Preliminar <span class="_ _12"></span>(AEP) é a <span class="_ _12"></span>verificação realiz<span class="_ _0"></span>ada das <span class="_ _0"></span>funções<span class="_ _0"></span> existentes<span class="_ _0"></span> nos <span class="_ _0"></span>setores <span class="_ _0"></span>da </div><div class="t m0 x1 h2 y105 ff1 fs0 fc0 sc0 ls0 ws0">empresa <span class="_"> </span>para<span class="_ _12"></span> <span class="_"> </span>qualificação <span class="_"> </span>d<span class="_ _0"></span>as <span class="_"> </span>condiçõ<span class="_ _0"></span>es <span class="_"> </span>lab<span class="_ _0"></span>orais, <span class="_ _13"> </span>de <span class="_"> </span>acordo <span class="_ _13"> </span>com <span class="_"> </span>a <span class="_ _13"> </span>Norma <span class="_ _13"> </span>Regulamentadora<span class="_ _12"></span> <span class="_"> </span>17 <span class="_"> </span>(NR <span class="_ _13"> </span>17 <span class="_"> </span>- </div><div class="t m0 x1 h2 y106 ff1 fs0 fc0 sc0 ls0 ws0">Ergonomia), regida pela <span class="_ _2"></span>Portaria/MT<span class="_ _0"></span>P <span class="_ _2"></span>Nº 423, <span class="_ _2"></span>de 7 <span class="_ _2"></span>de <span class="_ _2"></span>outubro <span class="_ _2"></span>de <span class="_ _2"></span>2021 que visa <span class="_ _2"></span>estabelecer os <span class="_ _2"></span>parâmetros que </div><div class="t m0 x1 h2 y107 ff1 fs0 fc0 sc0 ls0 ws0">permitam <span class="_ _3"> </span>a <span class="_ _3"> </span>adaptação <span class="_ _3"> </span>das <span class="_ _3"> </span>condições <span class="_ _3"> </span>de <span class="_ _4"> </span>trabalho<span class="_ _0"></span> <span class="_ _3"> </span>às <span class="_ _4"> </span>características <span class="_ _3"> </span>biome<span class="_ _12"></span>cânicas <span class="_ _4"> </span>e <span class="_ _3"> </span>psicofisiológicas <span class="_ _3"> </span>dos </div><div class="t m0 x1 h2 y108 ff1 fs0 fc0 sc0 ls0 ws0">trabalhadores, <span class="_ _12"></span>de <span class="_ _12"></span>modo <span class="_ _0"></span>a <span class="_ _12"></span>proporcionar <span class="_ _12"></span>um <span class="_ _12"></span>m<span class="_ _2"></span>áximo<span class="_ _0"></span> <span class="_ _12"></span>de conf<span class="_ _0"></span>orto, <span class="_ _12"></span>segurança <span class="_ _12"></span>e d<span class="_ _0"></span>esempenho<span class="_ _0"></span> <span class="_ _12"></span>eficiente, <span class="_ _12"></span>tr<span class="_ _2"></span>abalhando<span class="_ _0"></span> </div><div class="t m0 x1 h2 y109 ff1 fs0 fc0 sc0 ls0 ws0">inclusive de forma<span class="_ _12"></span> preventiva.  </div><div class="t m0 x4 h2 y10a ff1 fs0 fc0 sc0 ls0 ws0">A <span class="_ _8"> </span>AEP <span class="_ _a"> </span>pode <span class="_ _a"> </span>ser <span class="_ _8"> </span>realizada <span class="_ _8"></span>por <span class="_ _8"> </span>meio <span class="_ _a"> </span>de <span class="_ _8"> </span>abordagens <span class="_ _8"> </span>qualitativas, <span class="_ _8"> </span>semiquantitativas, <span class="_ _8"> </span>quantitativas <span class="_ _8"> </span>ou </div><div class="t m0 x1 h2 y10b ff1 fs0 fc0 sc0 ls0 ws0">combinação <span class="_ _a"> </span>dessas, <span class="_ _8"> </span>dependendo <span class="_ _8"> </span>do<span class="_ _2"></span> <span class="_ _a"> </span>risco <span class="_ _a"> </span>e <span class="_ _a"> </span>dos <span class="_ _a"> </span>requisitos <span class="_ _a"> </span>legais, <span class="_ _a"> </span>a <span class="_ _a"> </span>fim <span class="_ _a"> </span>de <span class="_ _a"> </span>identificar <span class="_ _a"> </span>os <span class="_ _a"> </span>perigos <span class="_ _a"> </span>e <span class="_ _a"> </span>produzir<span class="_ _0"></span> </div><div class="t m0 x1 h2 y10c ff1 fs0 fc0 sc0 ls0 ws0">informações para <span class="_ _2"></span>o<span class="_ _2"></span> <span class="_ _2"></span>planej<span class="_ _0"></span>amento <span class="_ _2"></span>das <span class="_ _2"></span>medidas <span class="_ _2"></span>de <span class="_ _2"></span>prevenção <span class="_ _2"></span>necessárias. Ela <span class="_ _7"></span>p<span class="_ _12"></span>o<span class="_ _2"></span>de <span class="_ _2"></span>ser <span class="_ _2"></span>contemplada nas <span class="_ _2"></span>etapas </div><div class="t m0 x1 h2 y10d ff1 fs0 fc0 sc0 ls0 ws0">do <span class="_ _15"> </span>processo <span class="_ _16"> </span>de <span class="_ _16"> </span>identificação <span class="_ _15"> </span>de <span class="_ _15"> </span>perigos <span class="_ _16"> </span>e <span class="_ _16"> </span>de <span class="_ _15"> </span>avaliação <span class="_ _16"> </span>dos <span class="_ _15"> </span>riscos, <span class="_ _16"> </span>descrito <span class="_ _16"> </span>no <span class="_ _15"> </span>item <span class="_ _16"> </span>1<span class="_ _2"></span>.5.4 <span class="_ _16"> </span>da <span class="_ _15"> </span>Norma<span class="_ _0"></span> </div><div class="t m0 x1 h2 y10e ff1 fs0 fc0 sc0 ls0 ws0">Regulamentadora<span class="_ _0"></span> nº 01 (NR 01) - Disposiçõ<span class="_ _0"></span>es Gerais e<span class="_ _0"></span> Gerenciamento<span class="_ _0"></span> de Riscos <span class="_ _0"></span>Ocupacionais. </div><div class="t m0 x4 h2 y10f ff1 fs0 fc0 sc0 ls0 ws0">A AEP deve ser reg<span class="_ _0"></span>istrada p<span class="_ _0"></span>ela organizaçã<span class="_ _0"></span>o e esse doc<span class="_ _0"></span>umento é a for<span class="_ _0"></span>malização d<span class="_ _0"></span>esse registro. </div><div class="t m0 x36 h2 y110 ff1 fs0 fc0 sc0 ls0 ws0">A <span class="_"> </span>avaliação <span class="_"> </span>é <span class="_ _17"> </span>feita <span class="_"> </span>por <span class="_"> </span>m<span class="_ _2"></span>eio <span class="_"> </span>de <span class="_"> </span>observações, <span class="_"> </span>entrevistas, <span class="_"> </span>análise <span class="_"> </span>documental, <span class="_"> </span>coleta <span class="_ _17"> </span>de <span class="_"> </span>imagens <span class="_"> </span>e </div><div class="t m0 x1 h2 y111 ff1 fs0 fc0 sc0 ls0 ws0">confrontação <span class="_ _7"></span>das <span class="_ _7"></span>situações <span class="_ _7"></span>identificadas <span class="_ _7"></span>com <span class="_ _7"></span>a <span class="_ _7"></span>indicação <span class="_ _7"></span>de <span class="_ _6"></span>condições <span class="_ _7"></span>e <span class="_ _7"></span>requisitos <span class="_ _7"></span>da <span class="_ _7"></span>NR <span class="_ _6"></span>17, <span class="_ _7"></span>em <span class="_ _7"></span>especial <span class="_ _7"></span>em </div><div class="t m0 x1 h2 y112 ff1 fs0 fc0 sc0 ls0 ws0">relação aos seus 5 grand<span class="_ _12"></span>es itens: </div><div class="t m0 x36 h2 y113 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pfa" class="pf w0 h0" data-page-no="a"><div class="pc pca w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/8NxCLsR/amd-10.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">10<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x3c h2 y5e ff1 fs0 fc0 sc0 ls0 ws0">17.4 Organizaçã<span class="_ _0"></span>o do Trabalho </div><div class="t m0 x3c h2 y114 ff1 fs0 fc0 sc0 ls0 ws0">17.5 Levantamento<span class="_ _0"></span>, transporte e d<span class="_ _12"></span>esc<span class="_ _2"></span>arga individual <span class="_ _12"></span>de m<span class="_ _2"></span>ateriais </div><div class="t m0 x3c h2 y115 ff1 fs0 fc0 sc0 ls0 ws0">17.6 Mobiliário dos<span class="_ _0"></span> postos <span class="_ _0"></span>de trabalho </div><div class="t m0 x3c h2 y116 ff1 fs0 fc0 sc0 ls0 ws0">17.7 Máquinas e equip<span class="_ _0"></span>amentos </div><div class="t m0 x3c h2 y117 ff1 fs0 fc0 sc0 ls0 ws0">17.8 Condições a<span class="_ _0"></span>mbientais de trabalh<span class="_ _0"></span>o </div><div class="t m0 x4 h2 y118 ff1 fs0 fc0 sc0 ls0 ws0">Após <span class="_ _7"></span>a <span class="_ _6"></span>AEP, <span class="_ _7"></span>foram <span class="_ _7"></span>definid<span class="_ _0"></span>as <span class="_ _7"></span>as <span class="_ _6"></span>seguintes <span class="_ _7"></span>demandas <span class="_ _7"></span>que <span class="_ _7"></span>direcionam <span class="_ _7"></span>essa<span class="_ _0"></span> <span class="_ _7"></span>AET, <span class="_ _6"></span>levantadas<span class="_ _0"></span> <span class="_ _7"></span>através <span class="_ _7"></span>da </div><div class="t m0 x1 h2 y119 ff1 fs0 fc0 sc0 ls0 ws0">participação de tod<span class="_ _12"></span>o<span class="_ _2"></span>s os atores env<span class="_ _0"></span>olvidos nos pr<span class="_ _0"></span>ocessos de trabalh<span class="_ _12"></span>o desse posto: </div><div class="t m0 x4 h2 y11a ff1 fs0 fc0 sc0 ls0 ws0">Gatilhos que justificara<span class="_ _12"></span>m<span class="_ _2"></span> a reali<span class="_ _0"></span>zação da AET </div><div class="t m0 x7 h27 y11b ff1 fs0 fc0 sc0 ls7 ws0">1.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando há a neces<span class="_ _0"></span>sidade de uma<span class="_ _0"></span> avaliação mais apr<span class="_ _12"></span>o<span class="_ _2"></span>fundad<span class="_ _0"></span>a da situação: justifiq<span class="_ _0"></span>ue </span></span></div><div class="t m0 x7 h27 y11c ff1 fs0 fc0 sc0 ls7 ws0">2.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_ _0"></span>são id<span class="_ _12"></span>entificadas inad<span class="_ _0"></span>equações <span class="_ _0"></span>ou in<span class="_ _0"></span>suficiência <span class="_ _12"></span>das ações <span class="_ _12"></span>que já <span class="_ _0"></span>foram <span class="_ _12"></span>adotadas, dentr<span class="_ _12"></span>o </span></span></div><div class="t m0 x3d h2 y11d ff9 fs0 fc0 sc0 ls0 ws0">da <span class="_ _9"></span>dinâmica <span class="_ _9"></span>do <span class="_ _8"> </span>gerenciamento <span class="_ _9"></span>de <span class="_ _9"></span>risco <span class="_ _9"></span>(quando <span class="_ _9"></span>“rodar” <span class="_ _9"></span>o <span class="_ _8"> </span>ciclo <span class="_ _9"></span>PDCA) <span class="_ _9"></span>e <span class="_ _8"></span>o <span class="_ _9"></span>problema <span class="_ _9"></span>não <span class="_ _8"></span>foi </div><div class="t m0 x3d h2 y11e ff1 fs0 fc0 sc0 ls0 ws0">resolvido: justifique<span class="_ _0"></span> </div><div class="t m0 x7 h27 ye9 ff1 fs0 fc0 sc0 ls7 ws0">3.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_ _9"></span>fo<span class="_ _2"></span>r <span class="_ _9"></span>sugerida <span class="_ _9"></span>pelo <span class="_ _8"> </span>acompanhamento <span class="_ _8"></span>de <span class="_ _9"></span>saúde <span class="_ _9"></span>dos <span class="_ _8"> </span>trabalhadores <span class="_ _8"></span>(PCMSO) <span class="_ _9"></span>e <span class="_ _8"> </span>do <span class="_ _8"></span>item<span class="_ _0"></span> </span></span></div><div class="t m0 x3d h2 y11f ff1 fs0 fc0 sc0 ls0 ws0">1.5.5.1.1, <span class="_ _12"></span>alínea <span class="_ _12"></span>C <span class="_ _12"></span>da <span class="_ _12"></span>NR01 <span class="_ _12"></span>(citada <span class="_ _12"></span>abaixo): <span class="_ _0"></span>quando <span class="_ _10"></span>houver <span class="_ _0"></span>relação <span class="_ _10"></span>entre <span class="_ _12"></span>o<span class="_ _2"></span>s <span class="_ _12"></span>agravos/adoe<span class="_ _0"></span>cimento<span class="_ _0"></span> </div><div class="t m0 x3d h2 y120 ff1 fs0 fc0 sc0 ls0 ws0">do <span class="_ _7"></span>trabalhad<span class="_ _0"></span>or <span class="_ _7"></span>e<span class="_ _0"></span> <span class="_ _7"></span>as <span class="_ _7"></span>situaç<span class="_ _12"></span>õ<span class="_ _2"></span>es <span class="_ _7"></span>de<span class="_ _0"></span> <span class="_ _7"></span>trabalho.<span class="_ _0"></span> <span class="_ _7"></span>Citand<span class="_ _0"></span>o <span class="_ _7"></span>a <span class="_ _7"></span>nor<span class="_ _0"></span>ma, <span class="_ _7"></span>o <span class="_ _2"></span>médico <span class="_ _7"></span>coordenador <span class="_ _7"></span>do <span class="_ _2"></span>P<span class="_ _2"></span>CMS<span class="_ _0"></span>O </div><div class="t m0 x3d h2 y121 ff1 fs0 fc0 sc0 ls0 ws0">poderá indicar a realiz<span class="_ _0"></span>ação da AET: <span class="_ _0"></span>justifique </div><div class="t m0 x7 h27 y122 ff1 fs0 fc0 sc0 ls7 ws0">4.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_ _12"></span>for obser<span class="_ _0"></span>vada <span class="_ _12"></span>causa <span class="_ _0"></span>relacionada <span class="_ _12"></span>às <span class="_ _12"></span>co<span class="_ _2"></span>ndições <span class="_ _12"></span>de <span class="_ _12"></span>trabalho na <span class="_ _12"></span>análise <span class="_ _12"></span>de a<span class="_ _12"></span>cidentes (<span class="_ _0"></span>citada<span class="_ _0"></span> </span></span></div><div class="t m0 x3d h2 y123 ff1 fs0 fc0 sc0 ls0 ws0">no <span class="_ _6"></span>item <span class="_ _6"></span>1.5.5.5.2), <span class="_ _6"></span>tendo <span class="_ _6"></span>como <span class="_ _9"></span>resultado <span class="_ _6"></span>algum <span class="_ _6"></span>processo <span class="_ _6"></span>judicial <span class="_ _6"></span>ou <span class="_ _9"></span>não. <span class="_ _6"></span>A <span class="_ _6"></span>organização <span class="_ _6"></span>deve </div><div class="t m0 x3d h2 y124 ff1 fs0 fc0 sc0 ls0 ws0">realizar a análise<span class="_ _12"></span> de acidentes e de d<span class="_ _12"></span>o<span class="_ _2"></span>enças r<span class="_ _0"></span>elacionadas ao tr<span class="_ _0"></span>abalho, para <span class="_ _0"></span>encontrar as causas<span class="_ _12"></span> e </div><div class="t m0 x3d h2 y125 ff1 fs0 fc0 sc0 ls0 ws0">agir <span class="_ _6"></span>preventivamente <span class="_ _7"></span>e <span class="_ _9"></span>corretivam<span class="_ _0"></span>ente, <span class="_ _6"></span>para <span class="_ _6"></span>que <span class="_ _9"></span>não <span class="_ _6"></span>ocorram <span class="_ _6"></span>novos <span class="_ _6"></span>acidentes. <span class="_ _6"></span>Quando <span class="_ _6"></span>essa </div><div class="t m0 x3d h2 y126 ff1 fs0 fc0 sc0 ls0 ws0">análise <span class="_ _12"></span>estiver <span class="_ _12"></span>relacionad<span class="_ _0"></span>a <span class="_ _12"></span>com <span class="_ _12"></span>as <span class="_ _12"></span>condições <span class="_ _12"></span>de <span class="_ _12"></span>trabalho, <span class="_ _12"></span>uma <span class="_ _12"></span>AET <span class="_ _12"></span>deverá <span class="_ _10"></span>ser <span class="_ _0"></span>real<span class="_ _0"></span>izada: <span class="_ _12"></span>justifique </div><div class="t m0 x7 h27 y127 ff1 fs0 fc0 sc0 ls7 ws0">5.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_"> </span>for <span class="_"> </span>observada <span class="_"> </span>ca<span class="_ _12"></span>usa <span class="_"> </span>relacionada <span class="_"> </span>às <span class="_"> </span>condições <span class="_"> </span>de <span class="_"> </span>trabalho <span class="_"> </span>na <span class="_"> </span>anális<span class="_ _12"></span>e <span class="_ _17"> </span>das <span class="_"> </span>doenças<span class="_ _0"></span> </span></span></div><div class="t m0 x3d h2 y128 ff1 fs0 fc0 sc0 ls0 ws0">relacionadas <span class="_ _12"></span>ao <span class="_ _12"></span>trabalho <span class="_ _12"></span>(citada <span class="_ _0"></span>no <span class="_ _12"></span>item <span class="_ _12"></span>1.5.5.5.2), <span class="_ _12"></span>tendo <span class="_ _12"></span>como <span class="_ _0"></span>resultado<span class="_ _0"></span> <span class="_ _0"></span>algu<span class="_ _0"></span>m <span class="_ _0"></span>processo<span class="_ _0"></span> <span class="_ _12"></span>judicial </div><div class="t m0 x3d h2 y129 ff1 fs0 fc0 sc0 ls0 ws0">ou <span class="_ _12"></span>não. <span class="_ _12"></span>A <span class="_ _12"></span>organização <span class="_ _12"></span>deve <span class="_ _12"></span>realizar <span class="_ _12"></span>a <span class="_ _12"></span>análise <span class="_ _12"></span>de <span class="_ _12"></span>doenças <span class="_ _12"></span>relacionadas <span class="_ _10"></span>ao <span class="_ _12"></span>trabalho, <span class="_ _12"></span>para <span class="_ _12"></span>encontrar </div><div class="t m0 x3d h2 y12a ff1 fs0 fc0 sc0 ls0 ws0">as <span class="_ _8"></span>causas <span class="_ _9"></span>e <span class="_ _8"></span>agir <span class="_ _9"></span>preventivamente <span class="_ _9"></span>e <span class="_ _8"></span>corretiv<span class="_ _0"></span>amente, <span class="_ _9"></span>para <span class="_ _8"> </span>que <span class="_ _9"></span>não <span class="_ _9"></span>oco<span class="_ _2"></span>rram <span class="_ _9"></span>agravament<span class="_ _0"></span>os <span class="_ _9"></span>ou </div><div class="t m0 x3d h2 y12b ff1 fs0 fc0 sc0 ls0 ws0">novos <span class="_ _12"></span>adoecimentos. <span class="_ _12"></span>Quando <span class="_ _12"></span>essa <span class="_ _12"></span>análise <span class="_ _12"></span>estiver <span class="_ _12"></span>relac<span class="_ _0"></span>ionada <span class="_ _12"></span>com <span class="_ _12"></span>as <span class="_ _12"></span>co<span class="_ _2"></span>ndiç<span class="_ _0"></span>ões <span class="_ _12"></span>de <span class="_ _12"></span>trabalho, <span class="_ _0"></span>um<span class="_ _0"></span>a </div><div class="t m0 x3d h2 y12c ff1 fs0 fc0 sc0 ls0 ws0">AET deverá ser r<span class="_ _0"></span>ealizada: justifiq<span class="_ _0"></span>ue </div><div class="t m0 x7 h27 y12d ff1 fs0 fc0 sc0 ls7 ws0">6.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_ _4"> </span>o <span class="_ _15"> </span>resultado <span class="_ _16"> </span>de <span class="_ _4"> </span>uma <span class="_ _16"> </span>fiscalização <span class="_ _4"> </span>do <span class="_ _16"> </span>Auditor <span class="_ _16"> </span>Fiscal <span class="_ _4"> </span>do <span class="_ _16"> </span>Trabalho <span class="_ _16"> </span>(AFT) <span class="_ _16"> </span>identificar<span class="_ _12"></span> </span></span></div><div class="t m0 x3d h2 y9e ff1 fs0 fc0 sc0 ls0 ws0">inconsistências no P<span class="_ _0"></span>GR, pode dar o<span class="_ _0"></span> start no proc<span class="_ _0"></span>esso da necessidade<span class="_ _12"></span> de <span class="_ _2"></span>realizaç<span class="_ _12"></span>ão<span class="_ _2"></span> da AET.  </div><div class="t m0 x7 h27 y12e ff1 fs0 fc0 sc0 ls7 ws0">7.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff1">Quando <span class="_ _0"></span>houver <span class="_ _12"></span>situações q<span class="_ _12"></span>ue geram <span class="_ _12"></span>perda de<span class="_ _0"></span> <span class="_ _0"></span>produtividade, <span class="_ _12"></span>erro d<span class="_ _0"></span>o <span class="_ _0"></span>produto <span class="_ _12"></span>e reclam<span class="_ _0"></span>ações d<span class="_ _12"></span>os </span></span></div><div class="t m0 x3d h2 y12f ff1 fs0 fc0 sc0 ls0 ws0">clientes da organizaçã<span class="_ _12"></span>o<span class="_ _2"></span>, de<span class="_ _0"></span> forma considerá<span class="_ _0"></span>vel<span class="ff5">.</span> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pfb" class="pf w0 h0" data-page-no="b"><div class="pc pcb w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/VMTFkLc/amd-11.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">11<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x3e h15 y5e ff4 fs0 fc1 sc0 ls0 ws0">MATRIZ DE GRADUA<span class="_ _12"></span>Ç<span class="_ _2"></span>ÃO DE RIS<span class="_ _0"></span>COS E PERI<span class="_ _0"></span>GOS </div><div class="t m0 x1 h20 y130 ff2 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x3f h2 y131 ff1 fs0 fc0 sc0 ls0 ws0">A <span class="_ _8"> </span>classificação <span class="_ _a"> </span>do <span class="_ _8"> </span>Risco <span class="_ _8"> </span>Ergonômico <span class="_ _8"> </span>seguirá <span class="_ _a"> </span>uma <span class="_ _8"></span>adaptação <span class="_ _8"> </span>do <span class="_ _a"> </span>FMEA <span class="_ _8"> </span>(Failure <span class="_ _8"> </span>Mode <span class="_ _8"> </span>Effect <span class="_ _a"> </span>Analysis)<span class="_ _0"></span> </div><div class="t m0 x1 h2 y132 ff1 fs0 fc0 sc0 ls0 ws0">aplicado a <span class="_ _0"></span>Gestão de Sa<span class="_ _0"></span>úde <span class="_ _0"></span>e Segurança <span class="_ _0"></span>do Trabalho, <span class="_ _12"></span>agregando os itens <span class="_ _0"></span>solicitad<span class="_ _0"></span>os na OHSAS<span class="_ _0"></span> 18001, <span class="_ _0"></span>explicados </div><div class="t m0 x1 h2 y133 ff1 fs0 fc0 sc0 ls0 ws0">na <span class="_"> </span>OHSAS <span class="_"> </span>18002. <span class="_ _17"> </span>O <span class="_"> </span>principal <span class="_"> </span>objetivo <span class="_"> </span>é <span class="_"> </span>identificar <span class="_ _17"> </span>todas <span class="_"> </span>as <span class="_ _17"> </span>irregularidad<span class="_ _0"></span>es <span class="_"> </span>e <span class="_"> </span>problemas <span class="_ _17"> </span>que <span class="_"> </span>possam <span class="_"> </span>ser </div><div class="t m0 x1 h2 y134 ff1 fs0 fc0 sc0 ls0 ws0">ocasionados de f<span class="_ _0"></span>orma padroniz<span class="_ _0"></span>ada. </div><div class="t m0 x1 hd y135 ff5 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h22 y136 ff1 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h28 y137 ff2 fs5 fc0 sc0 ls11 ws0">1 <span class="ff3 ls0">–<span class="ff2"> Critério para definição da Severidade do Risco </span></span></div><div class="t m0 x1 hc y138 ff4 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y139 w22 h29"><div class="t m0 x40 hc y13a ff4 fs5 fc1 sc0 ls0 ws0">GRADAÇÃO DA SEVERIDADE | NR 01 </div></div><div class="c x1 y13b w22 h2a"><div class="t m0 x41 hc y13c ff5 fs5 fc0 sc0 ls0 ws0">Estimativa do Risco: severidade da consequência | <span class="ff4">AIHA</span> </div></div><div class="c x1 y13d w23 h29"><div class="t m0 xc hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Índice </div></div><div class="c x11 y13d w24 h29"><div class="t m0 x2b hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Definição </div></div><div class="c x42 y13d w25 h29"><div class="t m0 x2b hd y13e ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y13f w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">1 </div></div><div class="c x11 y13f w24 h2b"><div class="t m0 x2b hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Lesão leves sem necessidade de atenção médica, incômodos ou m<span class="_ _0"></span>al-<span class="_ _2"></span>estar. </div></div><div class="c x42 y13f w25 h29"><div class="t m0 x2b hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y141 w23 h29"><div class="t m0 x2c hd y13a ff5 fs5 fc0 sc0 ls0 ws0">2 </div></div><div class="c x11 y141 w24 h29"><div class="t m0 x2b hd y13a ff5 fs5 fc0 sc0 ls0 ws0">Lesão ou doença sérias reversíveis.  </div></div><div class="c x42 y142 w25 h2c"><div class="t m0 x2b hd y143 ff5 fs5 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x42 y141 w25 h2d"><div class="t m0 x2b hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y144 w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">3 </div></div><div class="c x11 y144 w24 h2b"><div class="t m0 x2b hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Lesão ou doenças críticas irreversíveis que podem limitar a capacidade funcional. </div></div><div class="c x42 y144 w25 h29"><div class="t m0 x2b hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y145 w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">4 </div></div><div class="c x11 y145 w24 h2b"><div class="t m0 x2b hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Lesão ou doença incapacitante ou mortal. </div></div><div class="c x42 y145 w25 h29"><div class="t m0 x2b hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y146 w23 h2e"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">5 </div></div><div class="c x11 y146 w24 h2e"><div class="t m0 x2b hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Mortes ou incapacidades múltiplas (&gt;10). </div></div><div class="c x42 y146 w25 h29"><div class="t m0 x2b hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y147 w22 h2f"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y148 w22 h30"><div class="t m0 x44 hc y13a ff4 fs5 fc1 sc0 ls0 ws0">Critérios para estimação da Severidade | AS/NZS 4360 </div></div><div class="c x42 y148 w25 h31"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y149 w23 h29"><div class="t m0 xc hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Índice </div></div><div class="c x11 y149 w26 h29"><div class="t m0 x2c hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Descritor </div></div><div class="c x45 y149 w27 h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Definição </div></div><div class="c x42 y149 w25 h29"><div class="t m0 x43 hd y13e ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y14a w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">1 </div></div><div class="c x11 y14a w26 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Leve </div></div><div class="c x45 y14a w27 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Incômodo, insatisfação ou dano leve sem necessidade de tratamento médico. </div></div><div class="c x42 y14a w25 h29"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y14b w23 h2e"><div class="t m0 x2c hd y14c ff5 fs5 fc0 sc0 ls0 ws0">2 </div></div><div class="c x11 y14b w26 h2e"><div class="t m0 x43 hd y14c ff5 fs5 fc0 sc0 ls0 ws0">Menor </div></div><div class="c x45 y14b w27 h2e"><div class="t m0 x43 hd y14c ff5 fs5 fc0 sc0 ls0 ws0">Incapacidade temporária com necessidade de tratamento médi<span class="_ _0"></span>co. </div></div><div class="c x42 y14b w25 h29"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y14d w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">3 </div></div><div class="c x11 y14d w26 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Moderada </div></div><div class="c x45 y14d w27 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Incapacidade ou deficiência permanente parcial (&lt;30%) em uma ou mais pessoas. </div></div><div class="c x42 y14d w25 h29"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y14e w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">4 </div></div><div class="c x11 y14e w26 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Maior </div></div><div class="c x45 y14e w27 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Morte e/ou incapacidade permanente total (&gt;30%) em até 10 pessoas. </div></div><div class="c x42 y14e w25 h29"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y14f w23 h2b"><div class="t m0 x2c hd y140 ff5 fs5 fc0 sc0 ls0 ws0">5 </div></div><div class="c x11 y14f w26 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Catastrófica </div></div><div class="c x45 y14f w27 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Diversas mortes ou incapacidade permanente total de mais de 10 pessoas. </div></div><div class="c x42 y14f w25 h29"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y150 w22 h2f"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h28 y151 ff2 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h28 y152 ff2 fs5 fc0 sc0 ls11 ws0">2 <span class="ff3 ls0">–<span class="ff2"> Critério para definição da Probabili<span class="_ _0"></span>dade do Risco </span></span></div><div class="t m0 x1 hc y153 ff4 fs5 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y154 w28 h29"><div class="t m0 x12 hc y13a ff4 fs5 fc1 sc0 ls0 ws0">GRADAÇÃO DA PROBABILIDADE | NR 01 </div></div><div class="c x1 y155 w28 h32"><div class="t m0 x46 hc y156 ff4 fs5 fc0 sc0 ls0 ws0">Estimativa Qualitativa: </div><div class="t m0 x47 hc y157 ff4 fs5 fc0 sc0 ls0 ws0">Categorias de Exposição Efetiva (sem considerar o EPI) | AIHA </div></div><div class="c x1 y158 w29 h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Índice </div></div><div class="c x4 y158 w2a h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Categoria </div></div><div class="c x48 y158 w2b h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Descrição </div></div><div class="c x42 y158 w2c h29"><div class="t m0 x43 h13 y13e ff5 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y159 w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">1 </div></div><div class="c x4 y159 w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposição a níveis muito baixos </div></div><div class="c x48 y159 w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposições &lt; 10% LEO (Limite de Exposição Ocupacional) </div></div><div class="c x42 y159 w2c h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y15a w29 h2e"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">2 </div></div><div class="c x4 y15a w2a h2e"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposição baixa </div></div><div class="c x48 y15a w2b h2e"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposições &gt;10% e &lt; 50% LEO </div></div><div class="c x42 y15a w2c h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y15b w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">3 </div></div><div class="c x4 y15b w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposição moderada </div></div><div class="c x48 y15b w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposições &gt; 50% e &lt; 100% LEO  </div></div><div class="c x42 y15b w2c h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y15c w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">4 </div></div><div class="c x4 y15c w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposição excessiva </div></div><div class="c x48 y15c w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposições &gt; 100% a 500% LEO </div></div><div class="c x42 y15c w2c h30"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y15d w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">5 </div></div><div class="c x4 y15d w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposição muito excessiva </div></div><div class="c x48 y15d w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Exposições superiores a 5 x LEO </div></div><div class="c x42 y15d w2c h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y15e w28 h2b"><div class="t m0 x43 hd y13a ff5 fs5 fc0 sc0 ls0 ws0">LEO = (Limite de Exposição Ocupacional) </div></div><div class="c x42 y15e w2c h29"><div class="t m0 x43 h33 y1 ff5 fse fc5 sc0 ls0 ws0"> </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h28 y15f ff2 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y160 ff2 fs5 fc0 sc0 ls11 ws0">3 <span class="ff3 ls0">–<span class="ff2"> Critério para definição da Eficiência das Medidas Preventivas<span class="ff1 fs0"> </span></span></span></div></div><div class="c x1 y161 w28 h29"><div class="t m0 x49 hc y13a ff4 fs5 fc1 sc0 ls0 ws0">AVALIAÇÃO DA EFETIVIDADE DAS MEDIDAS DE CONTROLE | NR 01 </div></div><div class="c x42 y162 w2d h34"><div class="t m0 x43 h13 y143 ff5 fs4 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x42 y161 w2d h35"><div class="t m0 x43 h13 y1 ff5 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y163 w28 h36"><div class="t m0 x46 hc y164 ff4 fs5 fc0 sc0 ls0 ws0">Estimativa Qualitativa: </div><div class="t m0 x4a hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Controle existente X Medidas preventivas </div></div><div class="c x42 y163 w2d h36"><div class="t m0 x43 h13 y165 ff5 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y166 w29 h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Índice </div></div><div class="c x4 y166 w2a h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Categoria </div></div><div class="c x48 y166 w2b h29"><div class="t m0 x43 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Descrição </div></div><div class="c x42 y166 w2d h29"><div class="t m0 x43 h13 y13e ff5 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x1 y167 w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls9 ws0">10%<span class="ls0"> </span></div></div><div class="c x4 y167 w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle excelente </div></div><div class="c x48 y167 w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Representa a melhor tecnologia ou prática de controle disponível. </div></div><div class="c x42 y167 w2d h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y168 w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls9 ws0">20%<span class="ls0"> </span></div></div><div class="c x4 y168 w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle em conformidade legal </div></div><div class="c x48 y168 w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle seguindo as normas legais, mantido adequadamente </div></div><div class="c x42 y168 w2d h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y169 w29 h37"><div class="t m0 x43 hd y16a ff5 fs5 fc0 sc0 ls9 ws0">60%<span class="ls0"> </span></div></div><div class="c x4 y169 w2a h37"><div class="t m0 x43 hd y16a ff5 fs5 fc0 sc0 ls0 ws0">Controle com pequenas deficiências </div></div><div class="c x48 y169 w2b h37"><div class="t m0 x43 hd y16b ff5 fs5 fc0 sc0 ls0 ws0">Controle adequado com pequenas deficiências na operação ou </div><div class="t m0 x43 hd y14c ff5 fs5 fc0 sc0 ls0 ws0">manutenção.  </div></div><div class="c x42 y169 w2d h38"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y16c w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls9 ws0">80%<span class="ls0"> </span></div></div><div class="c x4 y16c w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle deficiente </div></div><div class="c x48 y16c w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle incompleto ou com deficiências relevantes. </div></div><div class="c x42 y16c w2d h29"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y16d w29 h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">100% </div></div><div class="c x4 y16d w2a h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">Controle inexistente </div></div><div class="c x48 y16d w2b h2b"><div class="t m0 x43 hd y140 ff5 fs5 fc0 sc0 ls0 ws0">As medidas de controle são inexistentes ou totalmente inadequ<span class="_ _0"></span>adas.<span class="_ _2"></span> </div></div><div class="c x42 y16d w2d h30"><div class="t m0 x24 h33 y1 ff5 fse fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x1 y16e w28 h39"><div class="t m0 x43 hd y1 ff5 fs5 fc0 sc0 ls0 ws0"><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h18 y16f ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4b h9 y170 ff2 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4b h9 y171 ff2 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pfc" class="pf w0 h0" data-page-no="c"><div class="pc pcc w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/dgmGZ8G/amd-24.png"/><div class="c x1 y19 w4 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y1b w5 h8"><div class="t m0 xe h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y19 w6 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y19 w7 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                       Revisão 00 (<span class="_ _0"></span><span class="ls7">14<span class="ls0">/03/2023) <span class="_ _0"></span>  <span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0"> </span></span></span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y1d ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w9 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">12<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4c h9 y5e ff2 fs0 fc0 sc0 ls0 ws0">Matriz de Grad<span class="_ _0"></span>uação da Exp<span class="_ _0"></span>osição Ocupacion<span class="_ _0"></span>al aos R<span class="_ _0"></span>iscos </div><div class="t m0 x1 hd y172 ff5 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4d hd y173 ff5 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 hd y174 ff5 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1f h9 y175 ff2 fs0 fc0 sc0 ls0 ws0">Interpretação da<span class="_ _0"></span> Matriz de Gradua<span class="_ _0"></span>ção da Expo<span class="_ _0"></span>sição Ocup<span class="_ _0"></span>acional </div></div><div class="c x1 y176 w2e h3a"><div class="t m0 x26 hc y177 ff4 fs5 fc0 sc0 ls0 ws0">Resultado da </div><div class="t m0 x4e hc y178 ff4 fs5 fc0 sc0 ls0 ws0">Multiplicação </div></div><div class="c x4f y176 w2f h3a"><div class="t m0 x2c hc y179 ff4 fs5 fc0 sc0 ls0 ws0">Riscos de </div><div class="t m0 x50 hc y164 ff4 fs5 fc0 sc0 ls0 ws0">Exposição </div><div class="t m0 x26 hc y13a ff4 fs5 fc0 sc0 ls0 ws0">Ocupacional </div></div><div class="c x51 y176 w30 h3a"><div class="t m0 x49 hc y164 ff4 fs5 fc0 sc0 ls0 ws0">Ações </div></div><div class="c x52 y176 w31 h3a"><div class="t m0 x53 hc y164 ff4 fs5 fc0 sc0 ls0 ws0">Prazo </div></div><div class="c x1 yd7 w2e h3b"><div class="t m0 x24 hc y17a ff4 fs5 fc0 sc0 ls12 ws0">80 <span class="ls0">- </span>160<span class="_ _2"></span><span class="ls0"> </span></div></div><div class="c x4f yd7 w2f h3b"><div class="t m0 x4e hc y17a ff4 fs5 fc0 sc0 ls0 ws0">MUITO ALTO </div></div><div class="c x51 yd7 w30 h3b"><div class="t m0 x2b hd y17b ff5 fs5 fc0 sc0 ls0 ws0">Riscos <span class="_ _19"> </span>nesta <span class="_ _19"> </span>categoria <span class="_ _19"> </span>devem <span class="_ _19"> </span>ser <span class="_ _19"> </span>elim<span class="_ _0"></span>inados. <span class="_ _19"> </span>As </div><div class="t m0 x2b hc y17c ff4 fs5 fc0 sc0 ls0 ws0">Recomendações<span class="ff5"> <span class="_ _1a"> </span>são <span class="_ _1a"> </span>consid<span class="_ _0"></span>eradas <span class="_ _1a"> </span><span class="ff4">obrigatórias</span> <span class="_ _1a"> </span>e <span class="_ _1b"> </span>de </span></div><div class="t m0 x2b hc y17d ff5 fs5 fc0 sc0 ls0 ws0">responsabilidade <span class="_ _3"> </span>do <span class="_ _3"> </span><span class="ff4">diretor<span class="_ _2"></span></span> <span class="_ _3"> </span>da <span class="_ _3"> </span>área <span class="_ _3"> </span>de <span class="_ _3"> </span>negócio <span class="_ _3"> </span>ou <span class="_ _3"> </span>do </div><div class="t m0 x2b hd y17e ff5 fs5 fc0 sc0 ls0 ws0">empreendimento. </div></div><div class="c x52 yd7 w31 h3b"><div class="t m0 x54 hd y17c ff5 fs5 fc0 sc0 ls0 ws0">Implementação </div><div class="t m0 x3 hd y17d ff5 fs5 fc0 sc0 ls0 ws0">imediata. </div></div><div class="c x1 y17f w2e h3c"><div class="t m0 x54 hc y17a ff4 fs5 fc0 sc0 ls12 ws0">40<span class="fff ls0">–<span class="ff4"> </span></span>64<span class="ls0"> </span></div></div><div class="c x4f y17f w2f h3c"><div class="t m0 xc hc y17a ff4 fs5 fc0 sc0 ls0 ws0">SUBSTANCIAL </div></div><div class="c x51 y17f w30 h3c"><div class="t m0 x2b hd y17b ff5 fs5 fc0 sc0 ls0 ws0">Riscos <span class="_ _1c"> </span>nesta <span class="_ _1c"> </span>categoria <span class="_ _1c"> </span>devem <span class="_ _18"> </span>ser <span class="_ _1c"> </span>minimizados. <span class="_ _1c"> </span>As </div><div class="t m0 x2b hc y17c ff4 fs5 fc0 sc0 ls0 ws0">Recomendações<span class="ff5"> <span class="_ _1a"> </span>são <span class="_ _1b"> </span>consideradas <span class="_ _1a"> </span></span>obrigatórias<span class="ff5"> <span class="_ _1b"> </span>e<span class="_ _2"></span> <span class="_ _1b"> </span>de </span></div><div class="t m0 x2b hc y180 ff5 fs5 fc0 sc0 ls0 ws0">responsabilidade <span class="_ _6"></span>da <span class="_ _9"> </span><span class="ff4">gerência <span class="_ _7"></span>ger<span class="_ _2"></span>al</span> <span class="_ _6"></span>da <span class="_ _6"></span>área<span class="_ _2"></span> <span class="_ _7"></span>de<span class="_ _2"></span> <span class="_ _6"></span>negócio <span class="_ _6"></span>ou </div><div class="t m0 x2b hd y181 ff5 fs5 fc0 sc0 ls0 ws0">empreendimento. </div></div><div class="c x52 y17f w31 h3c"><div class="t m0 x13 hd y182 ff5 fs5 fc0 sc0 ls0 ws0">Implementação com </div><div class="t m0 x2c hd y17a ff5 fs5 fc0 sc0 ls0 ws0">prazo máximo de 1 </div><div class="t m0 x3 hd y183 ff5 fs5 fc0 sc0 ls0 ws0">(um) ano. </div></div><div class="c x1 y184 w2e h3b"><div class="t m0 x54 hc y17a ff4 fs5 fc0 sc0 ls12 ws0">16 <span class="ls0">- </span>32<span class="_ _2"></span><span class="ls0"> </span></div></div><div class="c x4f y184 w2f h3b"><div class="t m0 x26 hc y17a ff4 fs5 fc0 sc0 ls0 ws0">MODERADO </div></div><div class="c x51 y184 w30 h3b"><div class="t m0 x2b hd y17b ff5 fs5 fc0 sc0 ls0 ws0">Pode-se conviver <span class="_ _2"></span>com cenários neste nível de <span class="_ _2"></span>risco, mas este </div><div class="t m0 x2b hc y17c ff5 fs5 fc0 sc0 ls0 ws0">deve <span class="_ _7"></span>ser <span class="_ _7"></span>reduzido <span class="_ _2"></span>e<span class="_ _2"></span>m <span class="_ _7"></span>longo <span class="_ _2"></span>p<span class="_ _2"></span>razo. <span class="_ _7"></span>As <span class="_ _7"></span><span class="ff4">Recomendações</span> <span class="_ _7"></span>são </div><div class="t m0 x2b hc y17d ff5 fs5 fc0 sc0 ls0 ws0">consideradas <span class="_ _12"></span>obriga<span class="_ _2"></span>tórias <span class="_ _12"></span>e <span class="_ _0"></span>de <span class="_ _12"></span>responsabilidade d<span class="_ _0"></span>a <span class="ff4">gerência<span class="_ _0"></span> </span></div><div class="t m0 x2b hc y17e ff4 fs5 fc0 sc0 ls0 ws0">da área<span class="ff5">. </span></div></div><div class="c x52 y184 w31 h3b"><div class="t m0 x13 hd y182 ff5 fs5 fc0 sc0 ls0 ws0">Implementação com </div><div class="t m0 x2c hd y17a ff5 fs5 fc0 sc0 ls0 ws0">prazo máximo de 3 </div><div class="t m0 x55 hd y183 ff5 fs5 fc0 sc0 ls0 ws0">(três) anos. </div></div><div class="c x1 y185 w2e h3d"><div class="t m0 x56 hc y186 ff4 fs5 fc0 sc0 ls12 ws0">8 <span class="ls0">- </span>12<span class="_ _2"></span><span class="ls0"> </span></div></div><div class="c x4f y185 w2f h3d"><div class="t m0 x54 hc y186 ff4 fs5 fc0 sc0 ls0 ws0">BAIXO </div></div><div class="c x51 y185 w30 h3d"><div class="t m0 x2b hd y187 ff6 fs5 fc0 sc0 ls0 ws0">Cenários <span class="_ _8"> </span>com <span class="_ _8"> </span>nível <span class="_ _8"> </span>de <span class="_ _8"> </span>risco <span class="_ _8"> </span>considerado <span class="_ _9"> </span>“baixo”, <span class="_ _8"> </span>mas <span class="_ _8"> </span>que </div><div class="t m0 x2b hd y188 ff5 fs5 fc0 sc0 ls0 ws0">pode <span class="_ _1b"> </span>ser <span class="_ _1a"> </span>reduzido <span class="_ _1b"> </span>em <span class="_ _1a"> </span>caso <span class="_ _1b"> </span>de <span class="_ _1a"> </span>medidas <span class="_ _1b"> </span>com <span class="_ _1b"> </span>baixo </div><div class="t m0 x2b hc y189 ff5 fs5 fc0 sc0 ls0 ws0">investimento. <span class="_ _1c"> </span>As <span class="_ _1d"> </span><span class="ff4">Sugestões <span class="_ _1c"> </span>não <span class="_ _1d"> </span>são <span class="_ _1d"> </span>consideradas<span class="_ _0"></span> </span></div><div class="t m0 x2b hc y18a ff4 fs5 fc0 sc0 ls0 ws0">obrigatórias<span class="ff5">. <span class="_ _1d"> </span>A <span class="_ _1d"> </span>a<span class="_ _2"></span>valiação <span class="_ _1c"> </span>da <span class="_ _1d"> </span>implementaçã<span class="_ _2"></span>o <span class="_ _1d"> </span>é <span class="_ _1d"> </span>de </span></div><div class="t m0 x2b hc y18b ff5 fs5 fc0 sc0 ls0 ws0">responsabilidade <span class="_ _1e"> </span>da <span class="_ _1e"> </span><span class="ff4">gerência <span class="_ _1e"> </span>da <span class="_ _1f"> </span>área</span>.   <span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div><div class="t m0 x2b hd y18c ff6 fs5 fc0 sc0 ls0 ws0">Caso <span class="_ _7"></span>o <span class="_ _2"></span>risco <span class="_ _7"></span>“Baixo” <span class="_ _7"></span>avaliado <span class="_ _2"></span>não <span class="_ _7"></span>seja <span class="_ _7"></span>conclus<span class="_ _0"></span>ivo, <span class="_ _7"></span>ou <span class="_ _2"></span>nã<span class="_ _2"></span>o <span class="_ _7"></span>se </div><div class="t m0 x2b hd y18d ff5 fs5 fc0 sc0 ls0 ws0">tenha evidência<span class="_ _2"></span> da <span class="_ _2"></span>realização de uma <span class="_ _2"></span>avaliação quantitativa, </div><div class="t m0 x2b hd y18e ff5 fs5 fc0 sc0 ls0 ws0">esta deverá ser realizada. </div></div><div class="c x52 y185 w31 h3d"><div class="t m0 x2b hd y18f ff5 fs5 fc0 sc0 ls0 ws0">Implementação <span class="_ _5"> </span>caso <span class="_ _5"> </span>o<span class="_ _12"></span> </div><div class="t m0 x2b hd y186 ff5 fs5 fc0 sc0 ls0 ws0">custo <span class="_ _1b"> </span>seja <span class="_ _1b"> </span>baixo <span class="_ _1b"> </span>com </div><div class="t m0 x2b hd y190 ff5 fs5 fc0 sc0 ls0 ws0">baixo esforço. </div></div><div class="c x1 y191 w2e h3e"><div class="t m0 x2 hc y192 ff4 fs5 fc0 sc0 ls12 ws0">2 <span class="ls0">- 6 </span></div></div><div class="c x4f y191 w2f h3e"><div class="t m0 x57 hc y192 ff4 fs5 fc0 sc0 ls0 ws0">TRIVIAL </div></div><div class="c x51 y191 w30 h3e"><div class="t m0 x2b hd y193 ff6 fs5 fc0 sc0 ls0 ws0">Cenários <span class="_ _13"> </span>com <span class="_ _13"> </span>níve<span class="_ _2"></span>l <span class="_"> </span>de <span class="_ _20"> </span>risco <span class="_ _13"> </span>considerado <span class="_ _13"> </span>“trivial”, <span class="_ _13"> </span>podem </div><div class="t m0 x2b hd y194 ff5 fs5 fc0 sc0 ls0 ws0">conter <span class="_ _5"> </span>riscos <span class="_ _21"> </span>controlados, <span class="_ _21"> </span>ou, <span class="_ _21"> </span>com <span class="_ _5"> </span>potencial <span class="_ _21"> </span>de <span class="_ _5"> </span>dano </div><div class="t m0 x2b hc y192 ff5 fs5 fc0 sc0 ls0 ws0">irrelevante. <span class="_ _22"> </span>As <span class="_ _22"> </span><span class="ff4">Sugestões <span class="_ _22"> </span>n<span class="_ _0"></span>ão <span class="_ _22"> </span>são <span class="_ _22"> </span>cons<span class="_ _0"></span>ideradas </span></div><div class="t m0 x2b hc y195 ff4 fs5 fc0 sc0 ls0 ws0">obrigatórias<span class="ff5">. <span class="_ _1d"> </span>A <span class="_ _1d"> </span>a<span class="_ _2"></span>valiação <span class="_ _1c"> </span>da <span class="_ _1d"> </span>implementaçã<span class="_ _2"></span>o <span class="_ _1d"> </span>é <span class="_ _1d"> </span>de </span></div><div class="t m0 x2b hc y196 ff5 fs5 fc0 sc0 ls0 ws0">responsabilidade da <span class="ff4">gerência da área</span>.                                             <span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span><span class="_ _2"></span><span class="fc3 sc0"> </span></div></div><div class="c x52 y191 w31 h3e"><div class="t m0 x2b hd y194 ff5 fs5 fc0 sc0 ls0 ws0">Manutenção <span class="_ _23"> </span>das </div><div class="t m0 x2b hd y192 ff5 fs5 fc0 sc0 ls0 ws0">medidas <span class="_ _18"> </span>de <span class="_ _24"> </span>controles </div><div class="t m0 x2b hd y195 ff5 fs5 fc0 sc0 ls0 ws0">existentes </div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 hd y197 ff5 fs5 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y198 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y199 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x58 y19a w32 h3f"><div class="t m3 x59 h40 y19b ff1 fsf fc6 sc0 ls0 ws0">Le<span class="_ _12"></span>ve<span class="_ _25"> </span>Menor<span class="_ _26"> </span>Modera<span class="_ _2"></span>da<span class="_ _27"> </span>Mai<span class="_ _7"></span>or<span class="_ _28"> </span>Extrem<span class="_ _0"></span>a</div></div><div class="c x58 y19c w33 h41"><div class="t m3 x5a h42 y19d ff1 fs10 fc6 sc0 ls0 ws0">2<span class="_ _29"> </span>4<span class="_ _29"> </span>8<span class="_ _2a"> </span><span class="ls13">16<span class="_ _2b"> </span>32</span></div></div><div class="c x3d y19e w34 h43"><div class="t m3 x2b h40 y19f ff1 fsf fc6 sc0 ls0 ws0">Pos<span class="_ _2"></span>s<span class="_ _2"></span>ível</div></div><div class="c x3d y1a0 w34 h43"><div class="t m3 x2b h40 y1a1 ff1 fsf fc6 sc0 ls0 ws0">Pouc<span class="_ _2"></span>o </div><div class="t m3 x2b h40 y1a2 ff1 fsf fc6 sc0 ls0 ws0">Pr<span class="_ _2"></span>ová<span class="_ _2"></span>vel</div></div><div class="c x3d y1a3 w34 h43"><div class="t m3 x2b h40 y1a4 ff1 fsf fc6 sc0 ls0 ws0">Rar<span class="_ _2"></span>a</div></div><div class="c x5b y1a5 w35 h44"><div class="t m3 x5c h42 y1a6 ff1 fs10 fc0 sc0 ls0 ws0">Trivial</div></div><div class="c x58 y1a7 w36 h45"><div class="t m3 x5d h46 y1a8 ff2 fs11 fc7 sc0 ls0 ws0">MATRIZ <span class="_ _0"></span>DE RISCO - E<span class="_ _0"></span>SQUEMA 5x5</div></div><div class="c x3d y1a9 w34 h43"><div class="t m3 x2b h40 y1aa ff1 fsf fc6 sc0 ls0 ws0">Pr<span class="_ _2"></span>ová<span class="_ _2"></span>vel</div></div><div class="c x58 y1ab w37 h47"><div class="t m3 x29 h48 y1ac ff2 fs10 fc6 sc0 ls0 ws0">PROBABILIDADE</div></div><div class="c x3d y1ad w34 h49"><div class="t m3 x2b h40 y1ae ff1 fsf fc6 sc0 ls0 ws0">Mui<span class="_ _2"></span>to </div><div class="t m3 x2b h40 y1af ff1 fsf fc6 sc0 ls0 ws0">Pr<span class="_ _2"></span>ová<span class="_ _2"></span>vel</div></div><div class="c x4a y1b0 w38 h4a"><div class="t m3 x11 h48 y1b1 ff2 fs10 fc6 sc0 ls0 ws0">SEV<span class="_ _2"></span>ERIDADE</div></div><div class="c x1f y1ad w39 h4b"><div class="t m3 x5e h42 y1b2 ff1 fs10 fc6 sc0 ls0 ws0">5</div></div><div class="c x1f y1a9 w39 h4c"><div class="t m3 x5e h42 y1b3 ff1 fs10 fc6 sc0 ls0 ws0">4</div></div><div class="c x5f y1b4 w3a h4d"><div class="t m3 x3 h48 y1b5 ff2 fs10 fc8 sc0 ls0 ws0">Leg<span class="_ _2"></span>enda do<span class="_ _2"></span> Ris<span class="_ _0"></span>co</div></div><div class="c x5b y1b6 w35 h4e"><div class="t m3 x50 h42 y1b7 ff1 fs10 fc0 sc0 ls0 ws0">Mu<span class="_ _12"></span>ito<span class="_ _2"></span> Alto</div></div><div class="c x5b y1b8 w35 h4e"><div class="t m3 x5c h42 y1b9 ff1 fs10 fc0 sc0 ls0 ws0">Baixo</div></div><div class="c x5b y1ba w35 h4e"><div class="t m3 x50 h42 y1bb ff1 fs10 fc0 sc0 ls0 ws0">Moder<span class="_ _0"></span>ado</div></div><div class="c x5b y1bc w35 h4e"><div class="t m3 x50 h42 y1bd ff1 fs10 fc0 sc0 ls0 ws0">Su<span class="_ _0"></span>bstan<span class="_ _0"></span>cial</div></div><div class="c x1f y19e w39 h4c"><div class="t m3 x5e h42 y1be ff1 fs10 fc6 sc0 ls0 ws0">3</div></div><div class="c x1f y1a0 w39 h4c"><div class="t m3 x5e h42 y1bf ff1 fs10 fc6 sc0 ls0 ws0">2</div></div><div class="c x1f y1a3 w39 h4c"><div class="t m3 x5e h42 y1c0 ff1 fs10 fc6 sc0 ls0 ws0">1</div></div><div class="c x58 y1c1 w3b h4d"><div class="t m3 x57 h48 y1b5 ff2 fs10 fc1 sc0 ls0 ws0">Matri<span class="_ _0"></span>z de Ri<span class="_ _0"></span>sco Qualit<span class="_ _0"></span>ativa</div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pfd" class="pf w3c h4f" data-page-no="d"><div class="pc pcd w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/kHtg9t9/amd-25.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 x2e h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x4e h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                          Avaliação E<span class="_ _0"></span>rgonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x39 y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x48 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x63 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">13<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x64 h15 y1c8 ff4 fs0 fc1 sc0 ls0 ws0">AVALIAÇÃO DAS SI<span class="_ _12"></span>TUAÇÕES DE TRABALHO </div><div class="t m0 x10 h27 y1c9 ff5 fs0 fc0 sc0 ls14 ws0">1.<span class="ff8 ls0"> <span class="_ _18"> </span><span class="ff5">ALMOXARIFADO MA<span class="_ _0"></span>NUTENÇÃO PRI<span class="_ _0"></span>MÁRIA </span></span></div><div class="t m0 x30 h18 y1ca ff5 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>LMOXARIFE JR. </div><div class="t m0 x65 h18 y1cb ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pfe" class="pf w3c h4f" data-page-no="e"><div class="pc pce w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/BBKxj6t/amd-27.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">14<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x67 h18 y1cc ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pff" class="pf w3c h4f" data-page-no="f"><div class="pc pcf w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/g9k6Cd4/amd-8.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">15<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x65 h18 y1cd ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1ce ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1cf ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf10" class="pf w3c h4f" data-page-no="10"><div class="pc pc10 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/C6HjjrM/amd-12.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">16<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x69 h18 y1d0 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d1 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d2 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d3 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d4 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d5 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d6 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d7 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d8 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1d9 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1da ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1db ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1dc ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1dd ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1de ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1df ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf11" class="pf w3c h4f" data-page-no="11"><div class="pc pc11 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/swPDvnQ/amd-28.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">17<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1e0 ff5 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>LMOXARIFE PL<span class="_ _0"></span>. </div><div class="t m0 x65 h18 y1e1 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1e2 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1e3 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf12" class="pf w3c h4f" data-page-no="12"><div class="pc pc12 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/Sxzp55s/amd-29.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">18<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x6a h18 y1e4 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf15" class="pf w3c h4f" data-page-no="15"><div class="pc pc15 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/nMjnDwz/amd-30.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">21<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1e0 ff5 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>NALISTA A<span class="_ _0"></span>DM MATERIAIS J<span class="_ _0"></span>R. </div><div class="t m0 x65 h18 y1f0 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1f1 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1f2 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf16" class="pf w3c h4f" data-page-no="16"><div class="pc pc16 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/Ld73hqk/amd-31.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">22<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x6c h18 y1f3 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf17" class="pf w3c h4f" data-page-no="17"><div class="pc pc17 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/St82B0k/amd-18.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">23<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1e0 ff5 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: A<span class="_ _0"></span>NALISTA A<span class="_ _0"></span>DM MATERIAIS SR.<span class="_ _0"></span> </div><div class="t m0 x6b h18 y111 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1f4 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1f5 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf18" class="pf w3c h4f" data-page-no="18"><div class="pc pc18 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/r2PcrC1/amd-19.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">24<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x69 h18 y1f6 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1f7 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1f8 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1f9 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1fa ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y199 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf19" class="pf w3c h4f" data-page-no="19"><div class="pc pc19 w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/xs6WBND/amd-21.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">25<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x30 h18 y1e0 ff5 fs0 fc0 sc0 ls0 ws0">CARGO/FUNÇÃO: SER<span class="_ _0"></span>VIÇOS GERA<span class="_ _0"></span>IS - LIMPEZA<span class="_ _0"></span> </div><div class="t m0 x65 h18 y1fb ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1a" class="pf w3c h4f" data-page-no="1a"><div class="pc pc1a w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/GR45Mj6/amd-17.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">26<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x65 h18 y1fc ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1fd ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1b" class="pf w3c h4f" data-page-no="1b"><div class="pc pc1b w3c h4f"><img class="bi x0 y0 w3d h50" alt="" src="https://i.ibb.co/BzLJ3Xn/amd-15.png"/><div class="c x60 y1c2 w4 h51"><div class="t m0 xc h2 y1c3 ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c x38 y1c4 w3e h8"><div class="t m0 x2b h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                             Avalia<span class="_ _0"></span>ção Ergonô<span class="_ _0"></span>mica Prelimina<span class="_ _0"></span>r <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c x38 y1c2 w3f h52"><div class="t m0 x2b h2 y1c5 ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x61 y1c2 w40 h52"><div class="t m0 xc h2 y1c5 ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                                Revisã<span class="_ _0"></span>o 00 (<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="_ _0"></span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y1c6 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x3f y1e w42 ha"><div class="t m0 x62 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x20 y1e w43 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALH<span class="_ _0"></span>O LTDA. </div><div class="t m0 x13 hd y1c7 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x66 y1e w44 ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">27<span class="ls0"> </span></div></div><div class="c x0 y1 w41 h4f"><div class="t m0 x30 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x65 h18 y1fe ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y1ff ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y200 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y201 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y202 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y203 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y204 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y205 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y206 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y207 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x68 h18 y208 ff5 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1c" class="pf w0 h0" data-page-no="1c"><div class="pc pc1c w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/f48Vq43/amd-7.png"/><div class="c x1 y209 w45 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y20a w46 h8"><div class="t m0 x26 h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y209 w47 h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c xf y209 w48 h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                          Revisão 00 (<span class="lsd">14</span>/03/20<span class="_ _0"></span>23)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y20b ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x6d y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x6e y1e w49 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERGOGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua San<span class="_ _2"></span>to Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x6f y1e wa ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">28<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x31 h15 y20c ff4 fs0 fc1 sc0 ls0 ws0">VALIDADE TÉCNI<span class="_ _12"></span>C<span class="_ _2"></span>A </div><div class="t m0 x30 h23 y20d ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 y20e ff5 fs0 fc0 sc0 ls0 ws0">O <span class="_ _2"></span>prazo <span class="_ _7"></span>de <span class="_ _2"></span>validade <span class="_ _7"></span>de<span class="_ _0"></span>sta <span class="_ _7"></span>Avaliação <span class="_ _2"></span>Ergonômica <span class="_ _2"></span>Preliminar <span class="_ _2"></span>reger-<span class="ls15">se</span>-á <span class="_ _2"></span>em <span class="_ _2"></span>s<span class="_ _2"></span>ua <span class="_ _2"></span>parcial <span class="_ _7"></span>ou <span class="_ _2"></span>totalidade, </div><div class="t m0 x1 h15 y20f ff4 fs0 fc0 sc0 ls0 ws0">pelas <span class="_ _2"></span>situações <span class="_ _2"></span>que <span class="_ _7"></span>ocor<span class="_ _0"></span>rerem <span class="_ _2"></span>primeiro:<span class="_ _2"></span><span class="ff5"> <span class="_ _2"></span>validade <span class="_ _2"></span>máxima <span class="_ _7"></span>de<span class="_ _0"></span> <span class="_ _2"></span>24 <span class="_ _7"></span>(vinte <span class="_ _2"></span>e <span class="_ _2"></span>quatro) <span class="_ _7"></span>mese<span class="_ _0"></span>s <span class="_ _7"></span>o<span class="_ _0"></span>u <span class="_ _7"></span>36<span class="_ _12"></span> <span class="_ _7"></span>(trinta <span class="_ _2"></span>e </span></div><div class="t m0 x1 h18 y210 ff5 fs0 fc0 sc0 ls0 ws0">seis) <span class="_ _7"></span>meses <span class="_ _6"></span><span class="ff6">–</span> <span class="_ _6"></span>no <span class="_ _6"></span>caso <span class="_ _6"></span>de <span class="_ _7"></span>empresas <span class="_ _6"></span>com <span class="_ _7"></span>c<span class="_ _2"></span>ertifica<span class="_ _0"></span>ções <span class="_ _6"></span>de <span class="_ _7"></span>gestão <span class="_ _6"></span>de <span class="_ _6"></span>SST <span class="_ _9"></span><span class="ff6">–</span>, <span class="_ _6"></span>a <span class="_ _7"></span>contar <span class="_ _6"></span>da <span class="_ _6"></span>data <span class="_ _6"></span>de <span class="_ _6"></span>emissão <span class="_ _7"></span>do </div><div class="t m0 x1 h15 y211 ff5 fs0 fc0 sc0 ls0 ws0">relatório <span class="_ _2c"> </span>final, <span class="_ _2c"> </span><span class="ff4">ou <span class="_ _2c"> </span>enquanto <span class="_ _2d"> </span>as <span class="_ _2c"> </span>condições <span class="_ _2c"> </span>de <span class="_ _2c"> </span>trabalho <span class="_ _2c"> </span>analisadas <span class="_ _2c"> </span>não <span class="_ _2c"> </span>sofrerem </span></div><div class="t m0 x1 h15 y212 ff4 fs0 fc0 sc0 ls0 ws0">modificações/alteraçõ<span class="_ _0"></span>es<span class="ff5">, <span class="_ _17"> </span>de <span class="_ _17"> </span>modo <span class="_ _3"> </span>a <span class="_ _17"> </span>observar <span class="_ _17"> </span>o <span class="_ _3"> </span>subitem <span class="_ _17"> </span>1.5.4.2.1, <span class="_ _17"> </span>da <span class="_ _17"> </span>NR <span class="_ _3"> </span>1 <span class="_ _3"> </span><span class="ff6">–</span> <span class="_ _17"> </span>Disposições <span class="_ _17"> </span>Gerais <span class="_ _17"> </span>e </span></div><div class="t m0 x1 h2 y213 ff5 fs0 fc0 sc0 ls0 ws0">Gerenciamento de R<span class="_ _12"></span>i<span class="_ _2"></span>scos <span class="_ _0"></span>Ocupacionais (Brasil, 202<span class="_ _12"></span>0).<span class="ff1"> </span></div><div class="t m0 x4 h11 y214 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y215 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y216 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y217 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y218 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y219 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21a ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21b ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21c ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21d ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21e ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y21f ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y220 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y221 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y222 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y223 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y224 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y225 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y226 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y227 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y228 ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y229 ff1 fs9 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1d" class="pf w0 h0" data-page-no="1d"><div class="pc pc1d w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/4jmrJqw/amd-3.png"/><div class="c x1 y209 w45 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y20a w46 h8"><div class="t m0 x26 h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y209 w2a h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x70 y209 w4a h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                             Revisão 00 <span class="_ _0"></span>(<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y20b ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w49 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e w4b ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">29<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x71 h15 y20c ff4 fs0 fc1 sc0 ls0 ws0">CONCLUSÃO </div><div class="t m0 x36 h23 y22a ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h18 y22b ff5 fs0 fc0 sc0 ls0 ws0">Todos os cargos e principais atividades foram alvo da Avaliação Ergonômica Preliminar (AEP), a qual </div><div class="t m0 x1 h18 y22c ff5 fs0 fc0 sc0 ls0 ws0">foi <span class="_ _6"></span>realizada <span class="_ _7"></span>observando <span class="_ _7"></span>os <span class="_ _7"></span>parâmetros <span class="_ _7"></span>indicados <span class="_ _7"></span>na <span class="_ _7"></span>NR17 <span class="_ _6"></span>para <span class="_ _6"></span>as <span class="_ _7"></span>condições <span class="_ _7"></span>de <span class="_ _6"></span>trabalho, <span class="_ _7"></span>que <span class="_ _7"></span>i<span class="_ _2"></span>nclu<span class="_ _0"></span>em <span class="_ _7"></span>a </div><div class="t m0 x1 h18 y22d ff5 fs0 fc0 sc0 ls0 ws0">organização <span class="_"> </span>do <span class="_ _17"> </span>trabalho, <span class="_ _20"> </span>as<span class="_ _2"></span>pectos <span class="_ _20"> </span>relacionados <span class="_ _20"> </span>ao <span class="_ _17"> </span>levantamento, <span class="_ _20"> </span>transporte <span class="_ _17"> </span>e <span class="_ _17"> </span>des<span class="_ _0"></span>carga <span class="_ _17"> </span>de <span class="_"> </span>materiais, </div><div class="t m0 x1 h18 y22e ff5 fs0 fc0 sc0 ls0 ws0">mobiliário <span class="_ _12"></span>dos <span class="_ _12"></span>postos <span class="_ _0"></span>de <span class="_ _12"></span>trabalho, <span class="_ _12"></span>trabalho <span class="_ _12"></span>com <span class="_ _12"></span>m<span class="_ _2"></span>áquinas, <span class="_ _12"></span>equipamentos <span class="_ _12"></span>e fe<span class="_ _0"></span>rramentas <span class="_ _12"></span>manuais, <span class="_ _12"></span>bem <span class="_ _12"></span>como </div><div class="t m0 x1 h18 y22f ff5 fs0 fc0 sc0 ls0 ws0">às condições de <span class="_ _0"></span>conforto <span class="_ _0"></span>no ambiente de trabal<span class="_ _12"></span>ho<span class="_ _2"></span>. </div><div class="t m0 x36 h18 y230 ff5 fs0 fc0 sc0 ls0 ws0">Constatou-se que e<span class="_ _12"></span>x<span class="_ _2"></span>istem <span class="_ _0"></span>situações adequ<span class="_ _0"></span>adas e que n<span class="_ _0"></span>ão necessitam de nenhuma <span class="_ _0"></span>intervenção.  </div><div class="t m0 x36 h18 y231 ff5 fs0 fc0 sc0 ls0 ws0">Constatou-se <span class="_ _9"></span>também <span class="_ _8"> </span>que <span class="_ _9"> </span>existem <span class="_ _8"> </span>situações <span class="_ _9"> </span>e <span class="_ _a"> </span>condições <span class="_ _9"></span>de <span class="_ _8"> </span>trabalho <span class="_ _8"> </span>inadequadas <span class="_ _9"></span>e <span class="_ _8"> </span>que <span class="_ _8"> </span>possuem </div><div class="t m0 x1 h18 y232 ff5 fs0 fc0 sc0 ls0 ws0">grande potencial para <span class="_ _12"></span>s<span class="_ _2"></span>erem re<span class="_ _0"></span>solvidas ainda <span class="_ _0"></span>com medida<span class="_ _0"></span>s mais simples, <span class="_ _0"></span>oriundas da AEP<span class="_ _0"></span>. </div><div class="t m0 x36 h18 y233 ff5 fs0 fc0 sc0 ls0 ws0">Para que <span class="_ _2"></span>se <span class="_ _2"></span>cumpra as <span class="_ _2"></span>exigências legais, <span class="_ _2"></span>inclusive das <span class="_ _2"></span>NR <span class="_ _2"></span>01 e <span class="_ _2"></span>NR <span class="_ _2"></span>17, deve<span class="_ _2"></span>-<span class="_ _2"></span>se haver <span class="_ _2"></span>continuidade do </div><div class="t m0 x1 h18 y234 ff5 fs0 fc0 sc0 ls0 ws0">Programa de Gestão de Er<span class="_ _0"></span>gonomia com a implantaç<span class="_ _0"></span>ão das alterações contida<span class="_ _0"></span>s nesse documento, v<span class="_ _0"></span>alidações<span class="_ _0"></span> </div><div class="t m0 x1 h18 y235 ff5 fs0 fc0 sc0 ls0 ws0">dessas <span class="_ _8"> </span>implantaçõ<span class="_ _0"></span>es <span class="_ _8"> </span>pelos <span class="_ _8"> </span>trabalhadores, <span class="_ _9"></span>bem <span class="_ _8"> </span>como <span class="_ _9"> </span>a <span class="_ _a"> </span>validação <span class="_ _8"> </span>das <span class="_ _9"></span>ações <span class="_ _8"> </span>e <span class="_ _8"> </span>reavaliação <span class="_ _9"> </span>da <span class="_ _8"> </span>situação <span class="_ _8"> </span>de </div><div class="t m0 x1 h18 y236 ff5 fs0 fc0 sc0 ls0 ws0">trabalho <span class="_ _12"></span>avaliada. <span class="_ _12"></span>Toda <span class="_ _12"></span>essa <span class="_ _12"></span>lógica <span class="_ _12"></span>deve <span class="_ _12"></span>fazer <span class="_ _12"></span>parte <span class="_ _10"></span>do <span class="_ _12"></span>Inventário <span class="_ _12"></span>de <span class="_ _12"></span>Risco <span class="_ _12"></span>Ocupacional, <span class="_ _12"></span>dentro <span class="_ _12"></span>do <span class="_ _12"></span>PGR/GRO. </div><div class="t m0 x1 h18 ye9 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y237 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y238 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y239 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h18 y23a ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y23b ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y23c ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y23d ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 ydd ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y23e ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y23f ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y240 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y241 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y242 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y243 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y244 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y245 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1e" class="pf w0 h0" data-page-no="1e"><div class="pc pc1e w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/N7KGzk9/amd-2.png"/><div class="c x1 y209 w45 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y20a w46 h8"><div class="t m0 x26 h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y209 w2a h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x70 y209 w4a h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                             Revisão 00 <span class="_ _0"></span>(<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y20b ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w49 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e w4b ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">30<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x72 h15 y20c ff4 fs0 fc1 sc0 ls0 ws0">REFERÊNCIAS BIBLI<span class="_ _12"></span>OGRÁFICAS </div><div class="t m0 x1 h2 y246 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1b h27 y247 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">Norma <span class="_ _0"></span>Regulamentad<span class="_ _0"></span>ora <span class="_ _0"></span>01 <span class="_ _0"></span>(NR <span class="_ _0"></span>01) - <span class="_ _12"></span>Dis<span class="_ _2"></span>posiç<span class="_ _0"></span>ões <span class="_ _0"></span>Gerais <span class="_ _12"></span>e Gerenciamento <span class="_ _12"></span>de Riscos <span class="_ _12"></span>Ocupacionais </span></span></div><div class="t m0 x3f h18 y115 ff5 fs0 fc0 sc0 ls0 ws0">- <span class="_"> </span>Redação <span class="_"> </span>dada <span class="_"> </span>pela <span class="_"> </span>Portaria <span class="_"> </span>SEPRT <span class="_"> </span>n.º <span class="_"> </span>6.730, <span class="_"> </span>de <span class="_"> </span>09/03/20 <span class="_"> </span><span class="fc9">https://www.gov.br/tr<span class="_ _0"></span>abalho-e-</span></div><div class="t m0 x3f h18 y248 ff5 fs0 fc9 sc0 ls0 ws0">previdencia/pt-br/c<span class="_ _0"></span>omposicao/<span class="_ _0"></span>orgaos-especifi<span class="_ _0"></span>cos/secretar<span class="_ _0"></span>ia-<span class="ls16">de</span>-trabalho/inspec<span class="_ _0"></span>ao/seguran<span class="_ _0"></span>ca-</div><div class="t m0 x3f h18 y249 ff5 fs0 fc9 sc0 ls0 ws0">e-saude-<span class="ls17">no</span>-trabalho/nor<span class="_ _0"></span>mas-regulamentado<span class="_ _0"></span>ras/nr-<span class="ls14">01</span>-atualiz<span class="_ _0"></span>ada-2020.pdf<span class="_ _0"></span>/view<span class="fc0"> </span></div><div class="t m0 x1b h27 y24a ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">Norma <span class="_ _9"></span>Regulamentadora<span class="_ _0"></span> <span class="_ _9"></span>17 <span class="_ _8"> </span>(NR <span class="_ _9"> </span>17) <span class="_ _8"> </span>- <span class="_ _8"> </span>Ergonomia <span class="_ _9"></span>- <span class="_ _8"> </span>Redação <span class="_ _9"></span>da <span class="_ _8"> </span>Portaria/<span class="_ _12"></span>MT<span class="_ _2"></span>P <span class="_ _9"></span>Nº <span class="_ _9"> </span>423, <span class="_ _8"> </span>de <span class="_ _8"> </span>7 <span class="_ _9"></span>de </span></span></div><div class="t m0 x3f h18 y24b ff5 fs0 fc0 sc0 ls0 ws0">outubro <span class="_ _19"> </span>de <span class="_ _19"> </span>2021 <span class="_ _19"> </span>- <span class="_ _2f"> </span><span class="fc9">https://www.gov.br/trab<span class="_ _12"></span>alho-e-previdencia/pt-br/compo<span class="_ _0"></span>sicao/orgao<span class="_ _0"></span>s-</span></div><div class="t m0 x3f h18 y24c ff5 fs0 fc9 sc0 ls0 ws0">especificos/secr<span class="_ _0"></span>etaria-<span class="ls18">de</span>-trabalho/inspecao/seg<span class="_ _0"></span>uranca-e-saude<span class="_ _0"></span>-<span class="ls17">no</span>-trabalho/normas-</div><div class="t m0 x3f h18 y24d ff5 fs0 fc9 sc0 ls0 ws0">regulamentador<span class="_ _0"></span>as/nr-17.pdf/view<span class="fc0"> </span></div><div class="t m0 x1b h27 y24e ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR <span class="_ _2"></span>13966 <span class="ff6">–</span> <span class="_ _2"></span>Móveis <span class="_ _2"></span>para Escritório <span class="_ _2"></span><span class="ff6">–</span> Mesas <span class="_ _2"></span><span class="ff6">–</span> <span class="_ _2"></span>Classificação e <span class="_ _2"></span>características físicas dimensionais <span class="_ _2"></span>e </span></span></div><div class="t m0 x3f h18 y24f ff5 fs0 fc0 sc0 ls0 ws0">requisitos e méto<span class="_ _0"></span>dos de en<span class="_ _0"></span>sino; </div><div class="t m0 x1b h27 y250 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR 13962 <span class="ff6">–</span> Móve<span class="_ _0"></span>is para Escr<span class="_ _0"></span>itório <span class="ff6">–</span> Cadeira<span class="_ _0"></span>s <span class="ff6">–</span> Requisito<span class="_ _0"></span>s e métodos de <span class="_ _0"></span>ensaio; </span></span></div><div class="t m0 x1b h27 y251 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR 13961 <span class="ff6">–</span> Móve<span class="_ _0"></span>is para Escr<span class="_ _0"></span>itório <span class="ff6">–</span> Armár<span class="_ _0"></span>ios; </span></span></div><div class="t m0 x1b h27 y252 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR 9050 <span class="ff6">–</span> Ace<span class="_ _0"></span>ssibilidade a edif<span class="_ _0"></span>icações, mobil<span class="_ _0"></span>iário, espaço<span class="_ _0"></span>s e equipamento<span class="_ _0"></span>s urbanos; </span></span></div><div class="t m0 x1b h27 y253 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR 11226 <span class="ff6">–</span> Ergono<span class="_ _12"></span>m<span class="_ _2"></span>ia: Av<span class="_ _0"></span>aliação de Posturas E<span class="_ _0"></span>státicas de <span class="_ _0"></span>Trabalho; </span></span></div><div class="t m0 x1b h27 y254 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR 11228-<span class="ls14">2 </span><span class="ff6">–</span> E<span class="_ _0"></span>rgonomia <span class="ff6">–</span> Movi<span class="_ _0"></span>mentação manua<span class="_ _0"></span>l <span class="ff6">–</span> Parte 2: Empur<span class="_ _0"></span>rar e puxar;<span class="_ _0"></span> </span></span></div><div class="t m0 x1b h27 y255 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR <span class="_ _0"></span>11228-<span class="ls14">3 <span class="_ _12"></span><span class="ff6 ls0">–<span class="ff5"> Er<span class="_ _0"></span>gonomia <span class="_ _12"></span><span class="ff6">–<span class="ff5"> Mov<span class="_ _0"></span>imentação <span class="_ _12"></span>manual <span class="ff6">–</span> <span class="_ _12"></span>Parte 3: <span class="_ _12"></span>Movimentação <span class="_ _12"></span>de car<span class="_ _0"></span>gas <span class="_ _0"></span>leves <span class="_ _12"></span>em <span class="_ _0"></span>alta </span></span></span></span></span></span></span></div><div class="t m0 x3f h18 y256 ff5 fs0 fc0 sc0 ls0 ws0">frequência de repet<span class="_ _12"></span>i<span class="_ _2"></span>ção; </div><div class="t m0 x1b h27 y257 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NBR <span class="_ _8"> </span>20646 <span class="_ _a"> </span><span class="ff6">–</span> <span class="_ _8"> </span>Diretrizes <span class="_ _8"> </span>ergonômicas <span class="_ _8"> </span>para <span class="_ _8"> </span>a <span class="_ _a"> </span>otimiza<span class="_ _0"></span>ção <span class="_ _a"> </span>das <span class="_ _9"> </span>c<span class="_ _2"></span>argas <span class="_ _8"> </span>de <span class="_ _8"> </span>trabalho <span class="_ _8"> </span>sobre <span class="_ _8"> </span>o <span class="_ _8"> </span>sis<span class="_ _2"></span>tema </span></span></div><div class="t m0 x3f h18 y258 ff5 fs0 fc0 sc0 ls0 ws0">musculoesqueléti<span class="_ _0"></span>co; </div><div class="t m0 x1b h27 y259 ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NHO 11 <span class="ff6">–</span> Pro<span class="_ _12"></span>c<span class="_ _2"></span>edimento <span class="_ _12"></span>Técnico <span class="ff6">–</span> Avaliação do<span class="_ _0"></span>s Níveis de Il<span class="_ _0"></span>uminamento <span class="_ _12"></span>em Ambientes Int<span class="_ _0"></span>ernos de </span></span></div><div class="t m0 x3f h18 y2e ff5 fs0 fc0 sc0 ls0 ws0">Trabalho; </div><div class="t m0 x1b h27 y25a ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">GRANDJEAN, <span class="_ _12"></span>K.H.E. <span class="_ _0"></span>Kroemer <span class="_ _12"></span>E. Man<span class="_ _0"></span>ual <span class="_ _0"></span>de <span class="_ _12"></span>Ergonomia <span class="ff6">–</span> <span class="_ _12"></span>Adaptando <span class="_ _12"></span>o Trabal<span class="_ _12"></span>ho<span class="_ _2"></span> <span class="_ _0"></span>ao <span class="_ _12"></span>Homem. 5ª<span class="_ _0"></span> <span class="_ _12"></span>edição. </span></span></div><div class="t m0 x3f h18 y25b ff5 fs0 fc0 sc0 ls0 ws0">Porto Alegre: Book<span class="_ _0"></span>man, 2005;<span class="_ _0"></span> </div><div class="t m0 x1b h27 y25c ff10 fs0 fc0 sc0 ls0 ws0">▪<span class="ff8"> <span class="_ _2e"> </span><span class="ff5">NOTA Técnica 060/20<span class="_ _0"></span>01: Ergonomia <span class="ff6">–</span> ind<span class="_ _0"></span>icação de p<span class="_ _0"></span>ostura a ser adotada n<span class="_ _0"></span>a concepção de post<span class="_ _0"></span>os </span></span></div><div class="t m0 x3f h18 y25d ff5 fs0 fc0 sc0 ls0 ws0">de trabalho. </div><div class="t m0 x1 h2 y25e ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y25f ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y260 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y261 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y262 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y263 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y264 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h2 y265 ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-atualizada-2020.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:389.960000px;bottom:689.060000px;width:165.040000px;height:19.350000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-atualizada-2020.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:47.350000px;bottom:669.720000px;width:507.650000px;height:19.340000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-atualizada-2020.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:47.350000px;bottom:650.370000px;width:425.000000px;height:19.350000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:203.150000px;bottom:611.690000px;width:351.850000px;height:19.340000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:47.350000px;bottom:592.340000px;width:507.650000px;height:19.350000px;background-color:rgba(255,255,255,0.000001);"></div></a><a class="l" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf/view"><div class="d m2" style="border-style:none;position:absolute;left:47.350000px;bottom:573.000000px;width:204.220000px;height:19.340000px;background-color:rgba(255,255,255,0.000001);"></div></a></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    <div id="pf1f" class="pf w0 h0" data-page-no="1f"><div class="pc pc1f w0 h0"><img class="bi x0 y0 w1 h1" alt="" src="https://i.ibb.co/4jmrJqw/amd-3.png"><div class="c x1 y209 w45 h7"><div class="t m0 xc h2 y1a ff1 fs0 fc0 sc0 ls0 ws0">         </div></div><div class="c xd y20a w46 h8"><div class="t m0 x26 h9 y1c ff2 fs0 fc2 sc0 ls0 ws0">                              <span class="_ _0"></span>                                   <span class="_ _0"></span>                      Avaliação<span class="_ _0"></span> Ergonômica Prel<span class="_ _0"></span>iminar <span class="ff3">–</span> AEP<span class="fc0"> </span></div></div><div class="c xd y209 w2a h8"><div class="t m0 x2b h2 y1c ff1 fs0 fc0 sc0 ls5 ws0">ERG<span class="ls0">-<span class="ls6">AE</span>P-COLORADO-0<span class="_ _0"></span>001-23 </span></div></div><div class="c x70 y209 w4a h8"><div class="t m0 xc h2 y1c ff1 fs0 fc0 sc0 ls0 ws0">                              <span class="_ _0"></span>                             Revisão 00 <span class="_ _0"></span>(<span class="lsd">14</span>/03/2023)   <span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="_ _0"></span><span class="fc3 sc0">  </span><span class="fc3 sc0"> </span><span class="fc3 sc0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y20b ff1 fs0 fc0 sc0 ls0 ws0"> </div></div><div class="c x10 y1e w8 ha"><div class="t m0 x11 hb y1 ff1 fs4 fc0 sc0 ls0 ws0"> </div></div><div class="c x12 y1e w49 ha"><div class="t m0 x13 hc y1f ff4 fs5 fc0 sc0 ls0 ws0">                                         ERG<span class="_ _2"></span>OGROUP SEGURANÇA DO TRABALHO LTDA. </div><div class="t m0 x13 hd y20 ff5 fs5 fc0 sc0 ls0 ws0">                                            Rua <span class="_ _2"></span>Santo Antônio<span class="ls8">, </span>145 <span class="ff6">–</span> Centro <span class="ff6">–</span> Uberaba/ MG </div><div class="t m0 x13 hb y21 ff5 fs5 fc0 sc0 ls0 ws0">                                              (<span class="ls9">34</span>) 3333-9987 / contato@ergogroup.com.br<span class="ff1 fs4"> </span></div></div><div class="c x14 y1e w4b ha"><div class="t m0 xc hb y22 ff1 fs4 fc0 sc0 ls10 ws0">31<span class="ls0"> </span></div></div><div class="c x0 y1 w2 h0"><div class="t m0 x1 h2 y23 ff1 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x73 h15 y20c ff4 fs0 fc1 sc0 ls0 ws0">DISPOSIÇÕES FI<span class="_ _0"></span>NAIS </div><div class="t m0 x1 h23 y20d ff1 fsd fc0 sc0 ls0 ws0"> </div><div class="t m0 x36 h15 y20e ff5 fs0 fc0 sc0 ls0 ws0">Este <span class="_ _2"></span>programa <span class="_ _2"></span>é <span class="_ _2"></span>parte <span class="_ _2"></span>i<span class="_ _2"></span>ntegrante das <span class="_ _2"></span>atividades <span class="_ _2"></span>de <span class="_ _2"></span>g<span class="_ _2"></span>estão <span class="_ _2"></span>de <span class="_ _2"></span>saúde <span class="_ _2"></span>e <span class="_ _2"></span>segurança <span class="_ _2"></span>d<span class="_ _2"></span><span class="ls5">a <span class="_ _7"></span></span><span class="ff4">Aç<span class="_ _12"></span>úcar <span class="_ _7"></span>e <span class="_ _2"></span>Álcool </span></div><div class="t m0 x1 h15 y20f ff4 fs0 fc0 sc0 ls0 ws0">Oswaldo <span class="_"> </span>Ribeir<span class="_ _0"></span>o <span class="_"> </span>de <span class="_ _13"> </span>Mendonça <span class="_ _13"> </span>Ltda<span class="ff5">, <span class="_"> </span>e <span class="_"> </span>dev<span class="_ _12"></span>e <span class="_"> </span>ter <span class="_"> </span>sua <span class="_"> </span>val<span class="_ _0"></span>idade <span class="_"> </span>e <span class="_"> </span>e<span class="_ _0"></span>ficácia <span class="_ _13"> </span>controlada <span class="_ _13"> </span>em <span class="_"> </span>u<span class="_ _0"></span>m <span class="_"> </span>processo<span class="_ _0"></span> </span></div><div class="t m0 x1 h18 y266 ff5 fs0 fc0 sc0 ls0 ws0">permanente de m<span class="_ _0"></span>elhoria contínu<span class="_ _0"></span>a, refletindo as re<span class="_ _12"></span>ais necessidades desta un<span class="_ _12"></span>idade.<span class="_ _2"></span> </div><div class="t m0 x36 h18 y42 ff5 fs0 fc0 sc0 ls0 ws0">Este <span class="_ _6"></span>documento <span class="_ _6"></span>possui <span class="_ _9"></span><span class="ls19">31</span> <span class="_ _9"></span>(trinta <span class="_ _6"></span>e <span class="_ _9"></span>uma) <span class="_ _6"></span>páginas, <span class="_ _6"></span>que <span class="_ _9"></span>deve <span class="_ _6"></span>ficar <span class="_ _9"></span>à <span class="_ _6"></span>disposição <span class="_ _6"></span>na <span class="_ _9"></span>organização <span class="_ _6"></span>pelo </div><div class="t m0 x1 h18 y43 ff5 fs0 fc0 sc0 ls0 ws0">prazo de 20 (vinte) <span class="_ _0"></span>anos, e está <span class="_ _12"></span>s<span class="_ _2"></span>ob a respons<span class="_ _0"></span>abilidade do(<span class="_ _12"></span>s<span class="_ _2"></span>) proprietár<span class="_ _0"></span>io(s) da empresa<span class="_ _0"></span>. </div><div class="t m0 x1 h18 y267 ff5 fs0 fc0 sc0 ls0 ws0"> </div><div class="t m0 x74 h18 y268 ff5 fs0 fc0 sc0 ls0 ws0">Guaíra, <span class="ls14">14</span> de mar<span class="_ _0"></span>ço de 2023.<span class="_ _0"></span> </div><div class="t m0 x4 h20 y269 ff2 fs9 fc0 sc0 ls0 ws0">Responsável pela elaboração da AEP: </div><div class="t m0 x4 h11 y26a ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y26b ff1 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x4 h11 y26c ff1 fs9 fc0 sc0 ls0 ws0">_______________________________________ </div><div class="t m0 x4 h11 y26d ff1 fs9 fc0 sc0 ls0 ws0">Amanda Viviane Muniz Rodrigues </div><div class="t m0 x4 h11 y26e ff1 fs9 fc0 sc0 ls0 ws0">Fisioterapeuta / Ergonomista </div><div class="t m0 x4 h11 y26f ff1 fs9 fc0 sc0 ls0 ws0">CREFITO 4/127866F</div><div class="t m0 x1 h20 y255 ff2 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h20 y270 ff2 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h20 y271 ff2 fs9 fc0 sc0 ls0 ws0"> </div><div class="t m0 x1 h20 y123 ff2 fs9 fc0 sc0 ls0 ws0"> </div></div></div><div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div></div>
    </div>
    <div class="loading-indicator">
    <img alt="" src=""/>
    </div>
    </body>
        </html>
    
  </div>
  
    `;
    
    // Conteúdo HTML da seção paisagem
    const landscapeContent = `<div style="page-break-before: always;">Conteúdo na orientação paisagem</div>`;

    // Renderizar a seção retrato
    // Renderizar a seção retrato
pdf.create(portraitContent, { format: 'A4' }).toFile('portrait_temp.pdf', (err) => {
  if (err) throw err;
  // Renderizar a seção paisagem
  pdf.create(landscapeContent, { format: 'A4', orientation: 'landscape' }).toFile('landscape_temp.pdf', (err) => {
    if (err) throw err;
    // Depois de renderizar ambas as seções em PDFs temporários, mescla-os
    const mergedPdfs = ['portrait_temp.pdf', 'landscape_temp.pdf'];
    const mergedOutput = 'result.pdf';
    mergePDFs(mergedPdfs, mergedOutput, () => {
      // Remove os PDFs temporários
      fs.unlinkSync('portrait_temp.pdf');
      fs.unlinkSync('landscape_temp.pdf');
      res.status(200).send('PDF criado com sucesso.');
    });
  });
});

  } catch (error) {
    console.error('Erro ao criar o PDF:', error);
    res.status(500).send('Erro ao criar o PDF.');
  }
});



app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

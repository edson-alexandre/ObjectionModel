const parseString = require("xml2js").parseString;
const { DOMParser } = require("xmldom");

module.exports = app => {
  const axios = require('axios')  
  
  const testSoap = (req, res) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.senior.com.br">
              <soapenv:Body>
                <ser:obterCliente>
                  <user>edson</user>
                  <password>silveira123</password>
                  <encryption>0</encryption>
                  <parameters>
                    <codigoEmpresa>1</codigoEmpresa>
                    <codigoFilial>1</codigoFilial>
                    <codigoCliente>${req.query.codcli}</codigoCliente>
                  </parameters>
                </ser:obterCliente>
              </soapenv:Body>
            </soapenv:Envelope>`;
    axios({
      method: "post",
      url: "http://207.180.247.29:8080/g5-senior-services/sapiens_Synccom_senior_g5_co_ger_cad_clientes?wsdl",      
      headers: {
        "Content-Type": "text/xml",
      },
      data: xml
    })
      .then((result) => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(result.data, "text/xml");
        let obj = {};
        const tipoRetorno = xmlDoc.getElementsByTagName("tipoRetorno")[0].childNodes[0].nodeValue;
        if (tipoRetorno === '1') {          
          const mensagemRetorno = xmlDoc.getElementsByTagName("mensagemRetorno")[0].childNodes[0].nodeValue;
          const nomeCliente = xmlDoc.getElementsByTagName("nomeCliente")[0].childNodes[0].nodeValue;
          const observacaoMotivo = xmlDoc.getElementsByTagName("observacaoMotivo")[0].childNodes[0].nodeValue;
          const saldoCreditos = parseFloat(xmlDoc.getElementsByTagName("saldoCreditos")[0].childNodes[0].nodeValue);
          const saldoDuplicatas = parseFloat(xmlDoc.getElementsByTagName("saldoDuplicatas")[0].childNodes[0].nodeValue);
          const valorLimiteCredito = parseFloat(xmlDoc.getElementsByTagName("valorLimiteCredito")[0].childNodes[0].nodeValue);
          obj = {
            tipoRetorno,
            mensagemRetorno,
            nomeCliente,
            observacaoMotivo,
            saldoCreditos,
            saldoDuplicatas,
            valorLimiteCredito,
          };
        } else {
            const mensagemRetorno = xmlDoc.getElementsByTagName("mensagemRetorno")[0].childNodes[0].nodeValue;
          obj = {
            tipoRetorno,
            mensagemRetorno,
          };
        }
        
        res.json( obj );
      })
      .catch((error) => {
        // res.send(error.response.data)
        console.log(error);
      });
  }
  
  return { testSoap }
}
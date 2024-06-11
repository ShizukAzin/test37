import * as xlsx from 'xlsx';
import * as React from 'react';

const XlsxToJson = () => {
  const [json, setJson] = React.useState([{ "Documento": "1111", "NomeCliente": "Teste", "ContaCapital": "1111111", "ValorIntegralizaçãoFolha": "222", "TotalLinhas": "3333", "ValorTotal": "44444444" }]);
  const [selectedOption, setSelectedOption] = React.useState('Pagto minimo cartao'); // Adiciona estado para a opção selecionada

  let newDate = new Date();
  let day = newDate.getDate();
  let stringDay = day.toString();
  if (stringDay.length < 2) stringDay = '0' + stringDay;
  let month = newDate.getMonth() + 1;
  let stringMonth = month.toString();
  if (stringMonth.length < 2) stringMonth = '0' + stringMonth;
  let year = newDate.getFullYear();

  const StrictNumberChars = (str, number) => {
    while (str.length > number) {
      str = str.slice(0, -1);
    }

    for (let i = str.length; i <= number; ++i) {
      str += ' ';
    }

    return `${str}`;
  }

  const FormatValue = (value) => {
    let floatValue = parseFloat(value).toFixed(2);
    let stringValue = floatValue.toString();
    for (let i = stringValue.length; i <= 17; ++i) {
      stringValue = '0' + stringValue;
    }
    let formatedValue = stringValue.replace('.', '');

    return `${formatedValue}`;
  }

  const AddZeros = (value, number) => {
    let stringValue = value.toString();
    for (let i = stringValue.length; i <= number; ++i) {
      stringValue = '0' + stringValue;
    }

    return `${stringValue}`;
  }

  const MapValues = () => {
    try {
      return (
        json.map((item) => (
          <pre>
            {StrictNumberChars(`1D${AddZeros(item.ContaCapital, 9)}${RemoverAcentos(item.NomeCliente)}`, 47)}
            {`    `}
            {`00000000000000            `}
            {AddZeros(`${item.ContaCapital}`, 12)}
            {`                    `}
            {FormatValue(`${item.ValorIntegralizaçãoFolha}   `)}
            {' '.repeat(14)}{selectedOption}
            {`                                       `}
          </pre>
        ))
      );
    } catch (error) {
      console.error(error);
      return (
        <p>Alguma informação do arquivo pode estar faltando ou inserido incorretamente, favor verificar.</p>
      );
    }
  }

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonReturn = xlsx.utils.sheet_to_json(worksheet);
        setJson(jsonReturn);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  try {
    return (
      <div>
        <form>
          <label htmlFor="upload">Selecione um arquivo .xlsx </label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
          <label htmlFor="option">Escolha uma opção: </label>
          <select id="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="Pagto minimo cartao">Pagto minimo cartao</option>
            <option value="Pgt.Parc.Emprestimo">Pgt.Parc.Emprestimo</option>
          </select>
        </form>
        <h1> Resultado: </h1>
        <div id='myInput'>
          <pre>
            {StrictNumberChars(`0175643810000000NOMEEMPRES0903${year}${stringMonth}${stringDay}`, 199)}

            {MapValues()}

            {StrictNumberChars(`9${AddZeros(json[0].TotalLinhas, 4)}${FormatValue(json[0].ValorTotal.toFixed(2)).padEnd(38, '0')}`, 199)}
            {`\u000A`}
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        <form>
          <label htmlFor="upload">Selecione um arquivo .xlsx </label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
          <label htmlFor="option">Escolha uma opção: </label>
          <select id="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="Pagto minimo cartao">Pagto minimo cartao</option>
            <option value="Pgt.Parc.Emprestimo">Pgt.Parc.Emprestimo</option>
          </select>
        </form>
        <h1> Resultado: </h1>
        <div id='myInput'>
          <p>Erro ao ler arquivo, verificar se o arquivo enviado é o correto.</p>
        </div>
      </div>
    );
  }
}

export default XlsxToJson;

function RemoverAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
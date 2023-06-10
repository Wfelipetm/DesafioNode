const readline = require('readline');

const criarInterfaceLeitura = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
};

const lerQuantidadeDiasTrabalhados = (rl, callback) => {
  const msg = 'Digite a quantidade de dias trabalhados: ';
  rl.question(msg, (input) => {
    const diasTrabalhados = parseInt(input);
    callback(diasTrabalhados);
  });
};

const calcularAnosMesesDias = (diasTrabalhados) => {
  const anos = Math.floor(diasTrabalhados / 365);
  const meses = Math.floor((diasTrabalhados % 365) / 30);
  const diasRestantes = (diasTrabalhados % 365) % 30;
  return { anos, meses, diasRestantes };
};

const exibirResultado = (resultado) => {
  console.log(`${resultado.anos} ano, ${resultado.meses} mês, ${resultado.diasRestantes} dia`);
};

const calcularAnosMesesDiasTrabalhados = () => {
  const rl = criarInterfaceLeitura();

  lerQuantidadeDiasTrabalhados(rl, (diasTrabalhados) => {
    const resultado = calcularAnosMesesDias(diasTrabalhados);
    exibirResultado(resultado);
    rl.close();
  });
};

calcularAnosMesesDiasTrabalhados();

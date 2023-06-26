const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function leiaValor(mensagem) {
  return new Promise((resolve) => {
    rl.question(mensagem, (valor) => {
      resolve(valor);
    });
  });
}

function leiaValorPositivo(mensagem) {
  return new Promise(async (resolve) => {
    let valor = await leiaValor(mensagem);
    valor = parseFloat(valor);
    while (isNaN(valor) || valor <= 0) {
      console.log("Valor inválido. Tente novamente.");
      valor = await leiaValor(mensagem);
      valor = parseFloat(valor);
    }
    resolve(valor);
  });
}

function calcularSalarioBruto(dias_trabalhados, dependente) {
  return 23.0 * dias_trabalhados + dependente * 34.0;
}

function calcularDescontoINSS(salario_bruto) {
  return 0.085 * salario_bruto;
}

function calcularDescontoIR(salario_bruto) {
  return 0.15 * salario_bruto;
}

async function calcularSalario() {
  console.log("--------------------------------------------");

  const nome_funcionario = await leiaValor("Digite o nome do funcionario: ");
  const dias_trabalhados = await leiaValorPositivo("Dias trabalhados: ");
  const dependente = await leiaValorPositivo("Quantos dependentes: ");

  const salario_bruto = calcularSalarioBruto(dias_trabalhados, dependente);
  const desconto_inss = calcularDescontoINSS(salario_bruto);
  const desconto_ir = calcularDescontoIR(salario_bruto);
  const salario_liquido = salario_bruto - desconto_inss - desconto_ir;

  console.log("-------------------------------------------");
  console.log("Nome do funcionario: " + nome_funcionario);
  console.log("Salário bruto: R$ " + salario_bruto.toFixed(2));
  console.log("Desconto INSS: R$ " + desconto_inss.toFixed(2));
  console.log("Desconto IR: R$ " + desconto_ir.toFixed(2));
  console.log("Salário Liquido: R$ " + salario_liquido.toFixed(2));
  console.log("-------------------------------------------");

  rl.close();
}

calcularSalario();

const readline = require('readline');

const QUANTIDADE_PROJETOS = 10;
const orcamentoProjetos = new Array(QUANTIDADE_PROJETOS).fill(0);

function leInformacoesDoUsuario() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("Digite o codigo do projeto[1-" + QUANTIDADE_PROJETOS + "] (ou 0 para sair): ", (codigoProjeto) => {
      if (codigoProjeto === '0') {
        rl.close();
        resolve([0]);
        return;
      }

      rl.question("Digite o valor [>0]: ", (valor) => {
        rl.question("Digite o tipo [R/D]: ", (tipo) => {
          rl.close();
          resolve([parseInt(codigoProjeto), parseInt(valor), tipo.toUpperCase()]);
        });
      });
    });
  });
}

function registraInformacoes(codigoProjeto, valor, tipo) {
  if (tipo === 'R') {
    orcamentoProjetos[codigoProjeto - 1] += valor;
  } else {
    orcamentoProjetos[codigoProjeto - 1] -= valor;
  }
}

function imprimeInformacoesProjeto() {
  console.log("------------------------");

  for (let i = 0; i < QUANTIDADE_PROJETOS; i++) {
    console.log("Projeto codigo " + (i + 1));
    console.log("  Saldo: R$ " + orcamentoProjetos[i].toFixed(2));
    console.log("------------------------");
  }
}

async function main() {
  let codigoProjeto = -1;

  while (codigoProjeto !== 0) {
    const informacoes = await leInformacoesDoUsuario();

    codigoProjeto = informacoes[0];
    if (codigoProjeto === 0) {
      break;
    }
    const valor = informacoes[1];
    const tipo = informacoes[2];

    registraInformacoes(codigoProjeto, valor, tipo);
  }

  imprimeInformacoesProjeto();
}

main();

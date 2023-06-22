const readline = require('readline');

function leiaEntradaUsuario() {
  console.log('O formato da entrada deve ser o seguinte:');
  console.log('[1, 2, 3, 4, ..., 30]');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question('Digite uma lista de inteiros: ', (entrada) => {
      rl.close();
      resolve(entrada);
    });
  });
}

function removeColcheteEspacosDaString(entrada) {
  entrada = entrada.replace(']', '');
  entrada = entrada.replace('[', '');
  entrada = entrada.replace(' ', '');
  return entrada;
}

function converteListaStringsParaInteiros(entrada) {
  entrada = removeColcheteEspacosDaString(entrada);

  const inteirosEntrada = [];
  if (entrada.length > 0) {
    const entradaArray = entrada.split(',');

    for (let i = 0; i < entradaArray.length; i++) {
      inteirosEntrada.push(parseInt(entradaArray[i]));
    }
  }
  return inteirosEntrada;
}

function efetuaOperacoes(inteiros) {
  if (inteiros.length > 0) {
    let soma = 0;
    let menor = inteiros[0];
    let maior = inteiros[0];

    for (let i = 0; i < inteiros.length; i++) {
      soma += inteiros[i];
      if (inteiros[i] < menor) {
        menor = inteiros[i];
      }
      if (inteiros[i] > maior) {
        maior = inteiros[i];
      }
    }

    const media = soma / inteiros.length;
    console.log('O maior valor é ' + maior);
    console.log('O menor valor é ' + menor);
    console.log('A média dos valores é ' + media.toFixed(2));

  } else {
    console.log('A lista está vazia');
  }
}

async function main() {
  const entrada = await leiaEntradaUsuario();
  const inteirosEntrada = converteListaStringsParaInteiros(entrada);
  efetuaOperacoes(inteirosEntrada);
}

main();

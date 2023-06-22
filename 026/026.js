const readline = require('readline');

function lerPalavra(palavras) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('\nDigite uma palavra: ', (palavra) => {
      palavras.push(palavra);
      rl.close();
      resolve();
    });
  });
}

function perguntarContinuarLeitura() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Continuar lendo? [s]im/[n]ão: ', (resposta) => {
      rl.close();
      resolve(resposta === 's');
    });
  });
}

function ordenaPalavrasPorTamanhoEmOrdemDescrescente(palavras) {
  palavras.sort((a, b) => b.length - a.length);
}

function preencheMaioresPalavras(palavras, maioresPalavras) {
  const tamanhoMaiorPalavra = palavras[0].length;
  for (const palavra of palavras) {
    const tamanhoPalavra = palavra.length;
    if (tamanhoPalavra === tamanhoMaiorPalavra) {
      maioresPalavras.push(palavra);
    } else {
      break;
    }
  }
}

function imprimeResultado(maioresPalavras) {
  console.log('\n');
  if (maioresPalavras.length > 1) {
    console.log('As maiores palavras são:');
  } else {
    console.log('A maior palavra é:');
  }
  for (const palavra of maioresPalavras) {
    console.log(palavra);
  }
}

async function palavraMaior() {
  const palavras = [];
  let continuarLendo = true;

  while (continuarLendo) {
    await lerPalavra(palavras);
    continuarLendo = await perguntarContinuarLeitura();
  }

  ordenaPalavrasPorTamanhoEmOrdemDescrescente(palavras);

  const maioresPalavras = [];
  preencheMaioresPalavras(palavras, maioresPalavras);
  imprimeResultado(maioresPalavras);
}

palavraMaior();

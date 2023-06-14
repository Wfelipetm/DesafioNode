const readline = require('readline');
const { clear } = require('console');

const votacao = {
  19: { nome: 'Leonardo', quantidade: 0 },
  27: { nome: 'Luizinho', quantidade: 0 },
  33: { nome: 'Alfredo', quantidade: 0 },
  42: { nome: 'Eymael', quantidade: 0 },
  500: { nome: 'Branco', quantidade: 0 },
};

let votosNulos = 0;
let votosTotais = 0;

function pressioneEnterParaContinuar() {
  console.log('Pressione ENTER para continuar...');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('keypress', (_, key) => {
    if (key.name === 'enter') {
      process.stdin.pause();
    }
  });
}

function imprimeMenu() {
  console.log('---------------------------------------------------');
  console.log('        Sistema de eleições presidenciais          ');
  console.log('---------------------------------------------------');
  console.log('Vote em um dos candidatos: ');
  console.log('   19 - Leonardo');
  console.log('   27 - Luizinho');
  console.log('   33 - Alfredo');
  console.log('   42 - Eymael');
  console.log('  500 - Voto em Branco');
  console.log('---------------------------------------------------');
}

function confirmaVoto(numeroVotado) {
  if (numeroVotado in votacao) {
    const nome = votacao[numeroVotado].nome;
    console.log(`O seu voto é no candidato: ${nome}`);
  } else {
    console.log('Candidato inválido!');
  }
  const confirmacao = readline.question('Deseja confirmar? [s]im/[n]ão: ');
  return confirmacao.toLowerCase() === 's';
}

function contabilizaVoto(numeroVotado) {
  votosTotais++;
  if (numeroVotado in votacao) {
    votacao[numeroVotado].quantidade++;
  } else {
    votosNulos++;
  }
}

function imprimeRelatorioEleicao() {
  if (votosTotais > 0) {
    const votosBrancos = votacao[500].quantidade;
    const votosInvalidos = votosBrancos + votosNulos;
    const votosValidos = votosTotais - votosInvalidos;

    clear();
    console.log('--------------------------------------');
    console.log('     Votos válidos por candidato');
    console.log('--------------------------------------');
    for (const [numero, candidato] of Object.entries(votacao)) {
      if (numero !== '500') {
        const nome = candidato.nome;
        const quant = candidato.quantidade;
        const porc = (quant * 100) / votosValidos;
        console.log(`${nome} - ${quant} - ${porc.toFixed(2)}%`);
      }
    }

    const porcBrancos = (votosBrancos * 100) / votosTotais;
    const porcNulos = (votosNulos * 100) / votosTotais;
    console.log('--------------------------------------');
    console.log(`Votos Brancos: ${votosBrancos} - ${porcBrancos.toFixed(2)}%`);
    console.log(`Votos Nulos: ${votosNulos} - ${porcNulos.toFixed(2)}%`);
  }
}

function leVotoEleitor() {
  let votacaoEmAndamento = true;
  let numeroVotado = 0;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function confirmarVoto() {
    rl.question('Deseja confirmar? [s]im/[n]ão: ', (confirmacao) => {
      const votoConfirmado = confirmacao.toLowerCase() === 's';
      if (votoConfirmado) {
        rl.close();
      } else {
        leNumeroCandidato();
      }
    });
  }

  function leNumeroCandidato() {
    rl.question('Digite o número do candidato: ', (numero) => {
      numeroVotado = parseInt(numero);
      if (numeroVotado !== 0 && numeroVotado in votacao) {
        const nome = votacao[numeroVotado].nome;
        console.log(`O seu voto é no candidato: ${nome}`);
        confirmarVoto();
      } else {
        console.log('Candidato inválido!');
        confirmarVoto();
      }
    });
  }

  clear();
  imprimeMenu();
  leNumeroCandidato();

  return new Promise((resolve) => {
    rl.on('close', () => {
      votacaoEmAndamento = false;
      resolve(numeroVotado);
    });
  });
}

async function main() {
  let continuaVotacao = true;
  while (continuaVotacao) {
    const numeroVotado = await leVotoEleitor();
    continuaVotacao = numeroVotado !== 0;
    if (continuaVotacao) {
      contabilizaVoto(numeroVotado);
      console.log('Voto contabilizado!');
      pressioneEnterParaContinuar();
    }
  }

  imprimeRelatorioEleicao();
}

main();


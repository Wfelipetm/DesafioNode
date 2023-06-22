const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function leiaValorPositivo(mensagem) {
  return new Promise((resolve) => {
    rl.question(mensagem, (valor) => {
      valor = parseInt(valor);
      resolve(valor);
    });
  });
}

function implementa(n) {
  if (n === 2) {
    console.log("2 é primo");
  } else if (n % 2 === 0) {
    console.log(`${n} não é primo, pois 2 é o único número par primo.`);
  } else {
    let x = 3;
    while (x < n) {
      if (n % x === 0) {
        break;
      }
      x = x + 2;
    }
    if (x === n) {
      console.log(`${n} é primo`);
    } else {
      console.log(`${n} não é primo, pois é divisível por ${x}`);
    }
  }
}

async function verificarNumeroPrimo() {
  while (true) {
    console.log("------------------------------------");
    const n = await leiaValorPositivo("Digite um número: ");
    implementa(n);
    console.log("------------------------------------");

    rl.question("Deseja continuar? [s]im ou [n]ão: ", (sair) => {
      if (sair === 'n') {
        rl.close();
      } else {
        verificarNumeroPrimo();
      }
    });

    break;
  }
}

verificarNumeroPrimo();

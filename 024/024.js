const readline = require('readline');
const _ = require('lodash');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("--------------------------------------------");

function jogoAdivinhacao() {
  const numeroSecreto = _.random(1, 5);
  let totalDeTentativas = 4;
  let rodada = 1;

  function fazerTentativa() {
    rl.question(`--------------------------------------------
Tentativa ${rodada} de ${totalDeTentativas}
Tente adivinhar o número que eu pensei!: `, (chute) => {
      chute = parseInt(chute);

      const acertou = chute === numeroSecreto;

      if (acertou) {
        console.log("Parabéns, você acertou!");
        rl.close();
        return; // Encerra a função aqui para evitar a chamada abaixo
      }

      if (chute > numeroSecreto) {
        console.log(`O seu número é maior, tente um número menor que ${chute}`);
      } else {
        console.log(`O seu número é menor, tente um número maior que ${chute}`);
      }

      rodada++;
      totalDeTentativas--;

      if (totalDeTentativas > 0) {
        fazerTentativa();
      } else {
        console.log("Fim do jogo");
        rl.question("Deseja continuar no Game? [s]im ou [n]ão: ", (resposta) => {
          if (resposta === "s") {
            jogoAdivinhacao();
          } else {
            rl.close();
          }
        });
      }
    });
  }

  fazerTentativa();
}

jogoAdivinhacao();

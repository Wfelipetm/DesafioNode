const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function multa_aluguel(v_aluguel) {
  return 0.03 * v_aluguel;
}

function multa_por_dia(v_aluguel, dias_atraso) {
  return dias_atraso * 0.005 * v_aluguel;
}

function calcularAluguel() {
  rl.question('Digite o valor do aluguel: R$ ', (v_aluguel) => {
    rl.question('Quantos dias de atraso: ', (dias_atraso) => {
      const valor_a_pagar = parseFloat(v_aluguel) + multa_aluguel(parseFloat(v_aluguel)) + multa_por_dia(parseFloat(v_aluguel), parseFloat(dias_atraso));
      console.log(`Valor a pagar com juros e multa: R$ ${valor_a_pagar.toFixed(2)}`);
      
      rl.question('Deseja calcular juros e multa novamente? [s]im ou [n]ão: ', (sair) => {
        if (sair.toLowerCase() === 'n') {
          rl.close();
        } else {
          calcularAluguel();
        }
      });
    });
  });
}

calcularAluguel();

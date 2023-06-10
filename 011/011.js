const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculator() {
  rl.question('Digite um número: ', (num1) => {
    rl.question('Digite um operador: ', (operator) => {
      rl.question('Digite outro número: ', (num2) => {
        if (isNaN(num1) || isNaN(num2)) {
          console.log('Você precisa digitar um número.');
          calculator();
          return;
        }

        num1 = Number(num1);
        num2 = Number(num2);

        switch (operator) {
          case '+':
            console.log(num1 + num2);
            break;
          case '-':
            console.log(num1 - num2);
            break;
          case '/':
            console.log(num1 / num2);
            break;
          case '*':
            console.log(num1 * num2);
            break;
          case '**':
            console.log(num1 ** num2);
            break;
          default:
            console.log('Operador inválido.');
        }

        rl.question('Deseja sair? [s]im ou [n]ão: ', (answer) => {
          if (answer.toLowerCase() === 's') {
            rl.close();
          } else {
            calculator();
          }
        });
      });
    });
  });
}

calculator();

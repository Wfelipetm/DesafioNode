const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function removeCaractere() {
  rl.question('Digite uma string: ', (string) => {
    rl.question('Digite um caractere para remover: ', (caractere) => {
      string = string.replace(new RegExp(caractere, 'g'), '');
      console.log(string);
      
      rl.question('Deseja remover outro caractere? [s]im ou [n]ão: ', (sair) => {
        if (sair === 'n') {
          rl.close();
        } else {
          removeCaractere();
        }
      });
    });
  });
}

console.log('--------------------------------------------------------');
removeCaractere();

// Eu tenho um coelho que se chama Anestor.
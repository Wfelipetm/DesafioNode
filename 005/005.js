const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n = -1;
const getPositiveNumber = () => {
  rl.question('Digite um número positivo: ', (number) => {
    const parsedNumber = parseInt(number);

    if (parsedNumber > 0) {
      calculateSum(parsedNumber);
    } else {
      getPositiveNumber();
    }
  });
};

const calculateSum = (number) => {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    sum += i;
  }
  console.log(`Valor da soma de 1 até ${number} é ${sum}`);
  rl.close();
};

getPositiveNumber();
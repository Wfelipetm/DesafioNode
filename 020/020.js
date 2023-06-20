const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite uma frase: ', (frase) => {
  console.log();

  function quantidadeString(string) {
    return string.length;
  }

  function contaPontuacao(string) {
    string = string.toLowerCase();
    const pontuacao = ',!';
    return pontuacao.split('').reduce((count, char) => count + string.split(char).length - 1, 0);
  }

  function contaNumeros(string) {
    string = string.toLowerCase();
    const numeros = '0123456789';
    return numeros.split('').reduce((count, num) => count + string.split(num).length - 1, 0);
  }

  function contaVogais(string) {
    string = string.toLowerCase();
    const vogais = 'aeiou';
    return vogais.split('').reduce((count, vogal) => count + string.split(vogal).length - 1, 0);
  }

  const q = quantidadeString(frase);
  const p = contaPontuacao(frase);
  const n = contaNumeros(frase);
  const v = contaVogais(frase);

  console.log(`a) Quantidade de caracteres na string: ${q}`);
  console.log(`b) Quantidade de caracteres de pontuação: ${p}`);
  console.log(`c) Quantidade de caracteres numéricos: ${n}`);
  console.log(`d) Quantidade de caracteres vogais: ${v}`);

  rl.close();
});

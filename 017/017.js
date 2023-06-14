function embaralhaPalavraMantendoPrimeiraUltima(palavra) {
  const tamanhoPalavra = palavra.length;
  let novaPalavra = palavra;
  if (tamanhoPalavra > 1) {
    const meio = palavra.slice(1, tamanhoPalavra - 1).split('');
    let novoMeio = '';
    while (meio.length > 0) {
      const randomIndex = Math.floor(Math.random() * meio.length);
      novoMeio += meio[randomIndex];
      meio.splice(randomIndex, 1);
    }
    novaPalavra = palavra[0] + novoMeio + palavra[tamanhoPalavra - 1];
  }
  return novaPalavra;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite uma palavra: ', (palavra) => {
  const palavraEmbaralhada = embaralhaPalavraMantendoPrimeiraUltima(palavra);
  console.log(palavraEmbaralhada);
  rl.close();
});

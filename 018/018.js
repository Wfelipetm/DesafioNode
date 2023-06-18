const fs = require('fs');

function leTextoDoArquivo(nomeDoArquivo) {
  return fs.readFileSync(nomeDoArquivo, 'utf8');
}

function escreveTextoNoArquivo(texto, nomeDoArquivo) {
  fs.writeFileSync(nomeDoArquivo, texto);
}

function embaralhaPalavraMantendoPrimeiraUltima(palavra) {
  const tamanhoPalavra = palavra.length;
  let novaPalavra = palavra;
  if (tamanhoPalavra > 1) {
    const meio = palavra.slice(1, tamanhoPalavra - 1);
    const novoMeio = meio.split('').sort(() => Math.random() - 0.5).join('');
    novaPalavra = palavra[0] + novoMeio + palavra[tamanhoPalavra - 1];
  }
  return novaPalavra;
}

function main() {
  const texto = leTextoDoArquivo('entrada.txt');
  let novoTexto = '';
  texto.split(' ').forEach((palavra) => {
    novoTexto += `${embaralhaPalavraMantendoPrimeiraUltima(palavra)} `;
  });
  escreveTextoNoArquivo(novoTexto, 'saida.txt');
}

main();

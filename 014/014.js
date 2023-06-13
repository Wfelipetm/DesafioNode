const readline = require('readline');
const fs = require('fs');

const MEGABYTE = 1024 * 1024;
const usuarios = new Map();

function preencheInformacoesUsuarios() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve, reject) => {
      rl.question('Quantidade de usuários: ', (quantidadeUsuarios) => {
        const usuariosPromises = [];
  
        let i = 1;
  
        const solicitaInformacoes = () => {
          if (i > quantidadeUsuarios) {
            rl.close();
            resolve();
            return;
          }
  
          rl.question(`Digite o nome do usuário ${i}: `, (nomeUsuario) => {
            rl.question(`Digite o espaço utilizado em MB pelo usuário ${i}: `, (espacoUtilizado) => {
              usuarios.set(nomeUsuario, espacoUtilizado * MEGABYTE);
              i++;
              solicitaInformacoes();
            });
          });
        };
  
        solicitaInformacoes();
      });
    });
  }
  

function converteBytesParaMegabytes(espacoEmBytes) {
  return espacoEmBytes / MEGABYTE;
}

function criaRelatorio() {
  const quantidadeUsuarios = usuarios.size;
  const espacoTotal = calculaEspacoTotal();

  let relatorio = '';
  relatorio += 'ACME Inc.    Uso do espaço em disco pelos usuários\n';
  relatorio += '----------------------------------------------------\n';
  relatorio += 'Nr.  Usuário        Espaço utilizado     % do uso\n';

  let numero = 1;
  for (const [nomeUsuario, espacoDoUsuario] of usuarios.entries()) {
    const espacoEmMB = converteBytesParaMegabytes(espacoDoUsuario);
    const porcentagem = (espacoDoUsuario * 100) / espacoTotal;

    const textoNumero = String(numero).trim();
    const textoNome = nomeUsuario.trim();
    const textoEspaco = `${espacoEmMB.toFixed(2)} MB`;
    const textoPorc = `${porcentagem.toFixed(2)}%`;

    const linha = `${textoNumero.padEnd(5)}${textoNome.padEnd(15)}${textoEspaco.padEnd(20)}${textoPorc}\n`;
    relatorio += linha;
    numero++;
  }

  const espacoTotalEmMB = converteBytesParaMegabytes(espacoTotal);
  relatorio += `\nEspaço total ocupado: ${espacoTotalEmMB.toFixed(2)} MB\n`;
  relatorio += `Espaço médio ocupado: ${(espacoTotalEmMB / quantidadeUsuarios).toFixed(2)} MB\n`;

  return relatorio;
}

function calculaEspacoTotal() {
  let espacoTotal = 0;
  for (const espacoDoUsuario of usuarios.values()) {
    espacoTotal += espacoDoUsuario;
  }
  return espacoTotal;
}

function escreveTextoNoArquivo(texto, nomeDoArquivo) {
  fs.writeFile(nomeDoArquivo, texto, (err) => {
    if (err) {
      console.error('Ocorreu um erro ao salvar o relatório no arquivo:');
      console.error(err);
    } else {
        console.log(`Relatório salvo no arquivo ${nomeDoArquivo}`);
    }
  });
}

async function main() {
  await preencheInformacoesUsuarios();

  const relatorio = criaRelatorio();
  console.log(relatorio);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Digite o nome do arquivo para salvar o relatório: ', (nomeArquivo) => {
    escreveTextoNoArquivo(relatorio, nomeArquivo);
    rl.close();
  });
}

main().catch((error) => {
  console.error('Ocorreu um erro no programa:');
  console.error(error);
});


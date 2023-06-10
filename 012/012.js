const readline = require('readline');

const prodStringSize = 20;
const codigos = [1, 2, 3, 4, 5, 6];
const produtos = {
  [codigos[0]]: { nome: 'Cachorro Quente', preco: 9.00 },
  [codigos[1]]: { nome: 'X-Tudo', preco: 15.00 },
  [codigos[2]]: { nome: 'X-Infarto', preco: 17.00 },
  [codigos[3]]: { nome: 'Triplo X-EGG', preco: 12.00 },
  [codigos[4]]: { nome: 'Cheeseburguer', preco: 7.00 },
  [codigos[5]]: { nome: 'Refrigerante-Lata', preco: 10.00 }
};
const pedido = {
  [codigos[0]]: 0,
  [codigos[1]]: 0,
  [codigos[2]]: 0,
  [codigos[3]]: 0,
  [codigos[4]]: 0,
  [codigos[5]]: 0
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function imprimeCardapio() {
  console.log('------------------------------------------');
  console.log('  Produto             |  Codigo  |  Preco ');
  console.log('------------------------------------------');

  for (const codigo of codigos) {
    const produto = produtos[codigo];
    const nome = produto.nome.padEnd(prodStringSize);
    const preco = produto.preco.toFixed(2);
    const msg = `  ${nome}|  ${codigo}     |  R$ ${preco}`;
    console.log(msg);
  }

  console.log('------------------------------------------');
}

function imprimePedido() {
  let precoTotal = 0.00;
  console.log('==========================================');
  console.log('               Seu pedido                 ');
  console.log('==========================================');
  console.log('  Produto             |  Quant   |  Preco ');
  console.log('------------------------------------------');

  for (const codigo of codigos) {
    const quantidade = pedido[codigo];

    if (quantidade > 0) {
      const produto = produtos[codigo];
      const nome = produto.nome.padEnd(prodStringSize);
      const preco = produto.preco.toFixed(2);
      const msg = `  ${nome}|  ${quantidade}     |  R$ ${(quantidade * preco).toFixed(2)}`;
      console.log(msg);
      precoTotal += quantidade * preco;
    }
  }

  console.log('------------------------------------------');
  console.log(`  Preco Total: R$ ${precoTotal.toFixed(2)}`);
  console.log('------------------------------------------');
}

function imprimeMenu() {
  imprimeCardapio();
  imprimePedido();
}

function leOpcoesDoUsuario() {
    return new Promise((resolve) => {
      rl.question('Digite o código do produto (0 para sair): ', (opcao) => {
        opcao = parseInt(opcao);
        if (opcao === 0) {
          resolve({ opcao: 0, quantidade: 0 });
        } else {
          rl.question('Digite a quantidade: ', (quantidade) => {
            resolve({ opcao: parseInt(opcao), quantidade: parseInt(quantidade) });
          });
        }
      });
    });
  }
  

function validaInformacoes(opcao, quantidade) {
  const produtoExiste = codigos.includes(opcao);
  const quantidadeValida = quantidade > 0;

  if (!produtoExiste) {
    console.log('\n  Código de produto não encontrado!\n');
  } else if (!quantidadeValida) {
    console.log('\n  Quantidade digitada é inválida!\n');
  }

  return produtoExiste && quantidadeValida;
}

async function main() {
    let opcao = -1;
  
    do {
      imprimeMenu();
      const { opcao, quantidade } = await leOpcoesDoUsuario();
  
      if (opcao === 0) {
        break;
      }
  
      if (validaInformacoes(opcao, quantidade)) {
        pedido[opcao] += quantidade;
      }
    } while (opcao !== 0);
  
    console.log('\n  Efetue o pagamento no caixa.');
    console.log('  Muito obrigado pelo seu pedido!');
    rl.close();
  }
  
  main();
  

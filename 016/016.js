const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o salario inicial: R$ ', (salarioInicial) => {
  rl.question('Digite o ano de contratacao: ', (anoContratacao) => {
    rl.question('Digite o ano que voce quer saber o salario: ', (anoFinal) => {
      const diferencaAnos = anoFinal - anoContratacao;
      let porcentagemAumento = 0.015;
      const proporcaoAumentoTaxaAnual = 0.10;
      let salario = parseFloat(salarioInicial);
      
      for (let i = 0; i < diferencaAnos; i++) {
        salario += salario * porcentagemAumento;
        porcentagemAumento += porcentagemAumento * proporcaoAumentoTaxaAnual;
      }
      
      console.log(`O salario do funcionario em ${anoFinal} sera R$ ${salario.toFixed(2)}`);
      
      rl.close();
    });
  });
});

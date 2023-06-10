const readline = require('readline');
const math = require('mathjs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const leiaValorCatetoPositivo = (nomeCateto) => {
  const mensagem = `Digite o valor do cateto ${nomeCateto}: `;
  
  return new Promise((resolve) => {
    const recursiveQuestion = () => {
      rl.question(mensagem, (valorCateto) => {
        const parsedCateto = parseFloat(valorCateto);
        
        if (parsedCateto > 0) {
          resolve(parsedCateto);
        } else {
          recursiveQuestion();
        }
      });
    };
    
    recursiveQuestion();
  });
};

const calcularHipotenusa = async () => {
  const a = await leiaValorCatetoPositivo('a');
  const b = await leiaValorCatetoPositivo('b');
  
  const somaQuadradoCatetos = math.pow(a, 2) + math.pow(b, 2);
  const h = math.sqrt(somaQuadradoCatetos);
  
  console.log(`O valor da hipotenusa do triângulo retângulo é ${h.toFixed(2)}`);
  
  rl.close();
};

calcularHipotenusa();
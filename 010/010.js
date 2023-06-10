const readline = require('readline');
const math = require('mathjs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const leiaValor = (msg) => {
  return new Promise((resolve) => {
    rl.question(msg, (input) => {
      const valor = parseFloat(input);
      resolve(valor);
    });
  });
};

class Calculadora {
  adicao(n1, n2) {
    return n1 + n2;
  }

  subtracao(n1, n2) {
    return n1 - n2;
  }

  potencia(n, expoente) {
    return math.pow(n, expoente);
  }

  primeiroVsQuadradoDoSegundo(n1, n2) {
    return n1 * math.pow(n2, 2);
  }

  somaDosQuadrados(n1, n2) {
    return math.pow(n1, 2) + math.pow(n2, 2);
  }

  raizQuadrada(n) {
    return math.sqrt(n);
  }

  seno(n) {
    return math.sin(n);
  }

  multiplicacao(n1, n2) {
    return n1 * n2;
  }
}

const calcularValores = async () => {
  const n1 = await leiaValor('Digite o primeiro valor: ');
  const n2 = await leiaValor('Digite o segundo valor: ');

  const calculadora = new Calculadora();
  const a = calculadora.adicao(n1, n2);
  const quadrado_n1 = calculadora.potencia(n1, 2);
  const quadrado_n2 = calculadora.potencia(n2, 2);
  const b = calculadora.multiplicacao(n1, quadrado_n2);
  const c = quadrado_n1;
  const soma_dos_quadrados = calculadora.somaDosQuadrados(n1, n2);
  const d = calculadora.raizQuadrada(soma_dos_quadrados);
  const e = calculadora.seno(calculadora.subtracao(n1, n2));

  console.log(`a) ${a}`);
  console.log(`b) ${b}`);
  console.log(`c) ${c}`);
  console.log(`d) ${d}`);
  console.log(`e) ${e}`);

  rl.close();
};

calcularValores().catch((error) => console.error(error));
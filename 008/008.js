const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const leiaValorDaTemperatura = (c) => {
  return new Promise((resolve) => {
    const msg = c;
    rl.question(msg, (input) => {
      const valor = parseFloat(input);
      resolve(valor);
    });
  });
};

const converterParaFahrenheit = async () => {
  const tc = await leiaValorDaTemperatura('Informe a temperatura em °C: ');
  const tf = tc * 1.8 + 32;
  console.log(`A temperatura de ${tc}°C corresponde a ${tf}°F!`);
  rl.close();
};

const converterParaCelsius = async () => {
  const tf = await leiaValorDaTemperatura('Informe a temperatura em °F: ');
  const tc = (tf - 32) * 5 / 9;
  console.log(`A temperatura de ${tf}°F corresponde a ${tc}°C!`);
  rl.close();
};

converterParaFahrenheit().catch((error) => console.error(error));
// converterParaCelsius().catch((error) => console.error(error));
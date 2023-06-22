const readline = require('readline');


function LeiaEntradaUsuario() {
console.log('O formato da entrada deve ser o seguinte:');
console.log('[1, 2, 3, 4, ..., 30]');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question('Digite uma lista de inteiros: ', (entrada) => {
rl.close();
resolve(entrada);
});
});
}


function RemoveColcheteEspacosDaString(entrada) {
entrada = entrada.replace(']', '');
entrada = entrada.replace('[', '');
entrada = entrada.replace(' ', '');
return entrada;
}


function ConverteListaStringsParaInteiros(entrada) {
entrada = RemoveColcheteEspacosDaString(entrada);
const inteirosEntrada = [];
if (entrada.length > 0) {
entrada = entrada.split(',');
for (let i = 0; i < entrada.length; i++) {
inteirosEntrada.push(parseInt(entrada[i]));
}
}
return inteirosEntrada;
}


function EhQuadradoPerfeito(i) {
const raizQuadradaTruncada = Math.trunc(Math.sqrt(i));
return i === raizQuadradaTruncada ** 2;
}


function EfetuaOperacoes(inteiros) {
if (inteiros.length > 0) {
const quadradosPerfeitos = [];
for (let i = 0; i < inteiros.length; i++) {
if (EhQuadradoPerfeito(inteiros[i])) {
quadradosPerfeitos.push(inteiros[i]);
}
}
console.log('Os valores da lista que são quadrados perfeitos:');
console.log(quadradosPerfeitos);
} else {
console.log('Lista está vazia!');
}
}


async function main() {
const entrada = await LeiaEntradaUsuario();
const inteirosEntrada = ConverteListaStringsParaInteiros(entrada);
EfetuaOperacoes(inteirosEntrada);
}


main();
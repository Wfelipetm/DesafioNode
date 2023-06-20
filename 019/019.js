const readline = require('readline');

function leiaNumeroInteiroPositivo() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('Digite um número inteiro positivo: ', numero => {
            rl.close();
            resolve(parseInt(numero));
        });
    });
}

function calculaFatorial(numero) {
    if (numero === 0) {
        return 1;
    }
    return numero * calculaFatorial(numero - 1);
}

function calculaFatorialLaco(numero) {
    let fatorial = 1;
    for (let n = 1; n <= numero; n++) {
        fatorial *= n;
    }
    return fatorial;
}

async function main() {
    const numero = await leiaNumeroInteiroPositivo();
    const fatorial = calculaFatorial(numero);
    const fatorialComLaco = calculaFatorialLaco(numero);

    console.log(`Fatorial de ${numero} é ${fatorial}`);
    console.log(`Fatorial_com_laco de ${numero} é ${fatorialComLaco}`);
}

main();

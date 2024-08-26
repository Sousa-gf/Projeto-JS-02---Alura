let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial (){
    exibirTextoTela('h1', 'Jogo do número Secreto');
    exibirTextoTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMsgInicial();

function verificarChute(){
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto){
        exibirTextoTela('h1', ' Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTextoTela('p', 'O número secreto é menor que o chute');
        } else{
            exibirTextoTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }   else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('desabled', true);
}

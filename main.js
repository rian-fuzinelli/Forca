
const palavras = ["javascript", "bootstrap", "programacao", "microsoft", "marcio", "edrianinho", "desenvolvimento", "tardigrado", "afobado", "eloquente"];
let tentativasUsadas = 0;
let botoes = document.getElementById('botoes');
let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let palavraSecreta, palavraOculta;
let jogando;

iniciarJogo();

function iniciarJogo() {
    // Cria os botões de letras
    botoes = document.getElementById('botoes');
    botoes.innerHTML = "";
    letras.forEach((value, index) => {
        botoes.innerHTML += `<button id="btn-${value}" class="btn btn-light me-1 mb-1" onclick="checarLetra('${value}')">${value}</button>`
    });

    jogando = true;
    tentativasUsadas = 0;
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    palavraOculta = '';
    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta += '_ ';
    }

    document.querySelector('h2').innerHTML = palavraOculta;
    document.getElementById("btnReiniciar").classList.add("d-none");
    desenharForca(tentativasUsadas);
}

// Função para verificar a Letra clicada
function checarLetra(letra) {
    if (!jogando) return;
    let l = document.getElementById('btn-' + letra);
    let achou = false;
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] == letra.toLowerCase()) {
            palavraOculta = replaceChar(palavraOculta, letra, i * 2);
            achou = true;
        }
    }
    document.querySelector('h2').innerHTML = palavraOculta;
    l.classList.remove('btn-light');
    if (achou)
        l.classList.add('btn-primary');
    else {
        l.classList.add('btn-danger');
        tentativasUsadas++;
        desenharForca(tentativasUsadas);
    }
    checarJogo();
}

// Função para trocar letras
function replaceChar(origString, replaceChar, index) {
    let newStringArray = origString.split("");
    newStringArray[index] = replaceChar;
    let newString = newStringArray.join("");
    return newString;
}

// Função para verificar status do jogo
function checarJogo() {
    if (tentativasUsadas == 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você perdeu!!!!!',
        });
        jogando = false;
        document.getElementById("btnReiniciar").classList.remove("d-none");
    }
    let newStringArray = palavraOculta.split(' ');
    newStringArray.pop();
    let newString = newStringArray.join('');
    if (newString.toLowerCase() == palavraSecreta) {
        Swal.fire({
            icon: 'success',
            title: 'Aeeee',
            text: 'Você ganhou!!!!!',
        });
        jogando = false;
        document.getElementById("btnReiniciar").classList.remove("d-none");
    }
}


// Função para desenhar a forca
function desenharForca(tentativasErradas) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#006700';
    ctx.lineWidth = 6;

    // Base da forca
    ctx.beginPath();
    ctx.moveTo(20, canvas.height - 10);
    ctx.lineTo(180, canvas.height - 10);
    ctx.stroke();

    ctx.strokeStyle = '#4e2708';
    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(60, canvas.height - 10);
    ctx.lineTo(60, 20);
    ctx.stroke();

    // Trave horizontal
    ctx.beginPath();
    ctx.moveTo(60, 20);
    ctx.lineTo(120, 20);
    ctx.stroke();

    // Corda
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 20);
    ctx.lineTo(60, 40);
    ctx.stroke();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    // Cabeça
    if (tentativasErradas >= 1) {
        ctx.beginPath();
        ctx.arc(120, 45, 15, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Corpo
    if (tentativasErradas >= 2) {
        ctx.beginPath();
        ctx.moveTo(120, 60);
        ctx.lineTo(120, 120);
        ctx.stroke();
    }

    // Braço esquerdo
    if (tentativasErradas >= 3) {
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(100, 100);
        ctx.stroke();
    }

    // Braço direito
    if (tentativasErradas >= 4) {
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(140, 100);
        ctx.stroke();
    }

    // Perna esquerda
    if (tentativasErradas >= 5) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 150);
        ctx.stroke();
    }

    // Perna direita
    if (tentativasErradas >= 6) {
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 150);
        ctx.stroke();
    }
}

const startButton = document.getElementById("startButton");

const menu = document.getElementById("menu");
const game = document.getElementById("game");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// =====================================================
// CENÁRIO
// =====================================================

const ceu = new Image();
ceu.src = "assets/cenarios/2/1.png";

const arvores = new Image();
arvores.src = "assets/cenarios/2/2.png";


// =====================================================
// PERSONAGEM
// =====================================================

const knight = new Image();

knight.src =
    "assets/cenarios/sprites cavalero/Knight_2/Walk.png";


// =====================================================
// CONFIGURAÇÃO DA ANIMAÇÃO
// =====================================================

const player = {

    x: 100,
    y: 280,

    width: 128,
    height: 128,

    frameWidth: 128,
    frameHeight: 128,

    currentFrame: 0,
    totalFrames: 8,

    animationSpeed: 100,

    lastFrameTime: 0,

    speed: 1.5,
    moving: true,
    destinationX: 650
};


// =====================================================
// BOTÃO COMEÇAR
// =====================================================

startButton.addEventListener("click", function () {

    menu.style.display = "none";

    game.style.display = "flex";

    iniciarJogo();

});


// =====================================================
// INICIAR JOGO
// =====================================================

function iniciarJogo() {

    requestAnimationFrame(gameLoop);

}


// =====================================================
// LOOP PRINCIPAL
// =====================================================

function gameLoop(currentTime) {

    atualizarMovimento();

    atualizarAnimacao(currentTime);

    desenharJogo();

    requestAnimationFrame(gameLoop);

}


function atualizarMovimento() {

    if (!player.moving) {
        return;
    }

    player.x += player.speed;

    if (player.x >= player.destinationX) {

        player.x = player.destinationX;

        player.moving = false;

    }

}

function atualizarAnimacao(currentTime) {

    if (currentTime - player.lastFrameTime >= player.animationSpeed) {

        player.currentFrame++;

        if (player.currentFrame >= player.totalFrames) {

            player.currentFrame = 0;

        }

        player.lastFrameTime = currentTime;

    }

}


// =====================================================
// DESENHAR JOGO
// =====================================================

function desenharJogo() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // -------------------------
    // CÉU
    // -------------------------

    ctx.drawImage(
        ceu,
        0,
        0,
        canvas.width,
        canvas.height
    );


    // -------------------------
    // ÁRVORES E CHÃO
    // -------------------------

    ctx.drawImage(
        arvores,
        0,
        0,
        canvas.width,
        canvas.height
    );


    // -------------------------
    // PERSONAGEM
    // -------------------------

    ctx.drawImage(

        knight,

        player.currentFrame * player.frameWidth,
        0,

        player.frameWidth,
        player.frameHeight,

        player.x,
        player.y,

        player.width,
        player.height

    );

}
const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 難易度設定
const difficultyLevels = {
    easy:   { gravity: 0.8, springK: 0.005, obstacleSpeed: 0.3, lives: 5 },
    normal: { gravity: 1.6, springK: 0.01,  obstacleSpeed: 0.5, lives: 3 },
    hard:   { gravity: 2.5, springK: 0.02,  obstacleSpeed: 0.9, lives: 1 }
};

// ゲーム状態変数
let currentDifficulty = 'normal';
let x = 200, y = 50, vx = 0, v = 0, restLength = 150;
let isJumping = false, isGameOver = false;
let lives = 3, level = 1, deepestReached = 0;
let obstacles = [], isInvincible = false, invincibleTimer = 0;
const keys = { ArrowLeft: false, ArrowRight: false };

window.addEventListener('keydown', (e) => { 
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
    if (e.key === 'r' || e.key === 'R') resetGame();
});
window.addEventListener('keyup', (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

function setDifficulty(lvl) {
    currentDifficulty = lvl;
    resetGame();
    alert(`Difficulty set to: ${lvl.toUpperCase()}`);
}

function resetGame() {
    const cfg = difficultyLevels[currentDifficulty];
    x = 200; y = 50; vx = 0; v = 0;
    isJumping = false; isGameOver = false;
    lives = cfg.lives; level = 1; deepestReached = 0;
    isInvincible = false; invincibleTimer = 0;
    generateObstacles();
}

function generateObstacles() {
    const cfg = difficultyLevels[currentDifficulty];
    obstacles = Array.from({ length: level + 1 }, () => ({
        x: Math.random() * 300 + 50, y: 200 + Math.random() * 300, width: 80, height: 20
    }));
}

function update() {
    if (isJumping && !isGameOver) {
        const cfg = difficultyLevels[currentDifficulty];
        // 物理演算
        if (keys.ArrowLeft) vx -= 0.5;
        if (keys.ArrowRight) vx += 0.5;
        vx -= (x - 200) * 0.01; vx *= 0.95; x += vx;

        let force = cfg.gravity;
        if (y > restLength) force -= (y - restLength) * cfg.springK;
        v += force; v *= 0.99; y += v;

        if (y > deepestReached) deepestReached = Math.floor(y);
        
        // 衝突判定
        obstacles.forEach(obs => {
            if (x > obs.x && x < obs.x + obs.width && y > obs.y && y < obs.y + obs.height && !isInvincible) {
                lives--; isInvincible = true; invincibleTimer = 60;
                vx = -vx * 1.5; v = -v * 1.2;
                if (lives <= 0) { isGameOver = true; socket.emit('submitScore', deepestReached); }
            }
        });
        if (isInvincible && --invincibleTimer <= 0) isInvincible = false;
        
        // レベル更新
        let newLevel = Math.floor(deepestReached / 500) + 1;
        if (newLevel !== level) { level = newLevel; generateObstacles(); }
        obstacles.forEach(o => o.x += (level * cfg.obstacleSpeed) * Math.sin(Date.now() / 500));
    }
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, 400, 600);
    ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(200, y); ctx.stroke();
    if (!(isInvincible && Math.floor(invincibleTimer / 5) % 2 === 0)) {
        ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = 'orange';
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
    ctx.fillStyle = 'black';
    ctx.fillText(`Depth: ${deepestReached}m | Lives: ${lives} | Level: ${level}`, 10, 20);
    if (isGameOver) ctx.fillText('GAME OVER - Click to Retry', 100, 300);
}

canvas.addEventListener('click', () => { if (!isJumping || isGameOver) isJumping = true; });
generateObstacles();
update();
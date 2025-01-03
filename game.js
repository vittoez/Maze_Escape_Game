
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

// Define grid and player
const gridSize = 15;
const cellSize = canvas.width / gridSize;
let player = { x: 0, y: 0 };
let goal = { x: gridSize - 1, y: gridSize - 1 };

// Generate random maze
let maze = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

function generateMaze() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            maze[i][j] = Math.random() < 0.25 ? 1 : 0; // 25% chance for a wall
        }
    }
    maze[0][0] = 0; // Start
    maze[gridSize - 1][gridSize - 1] = 0; // Goal
}

generateMaze();

// Draw maze
function drawMaze() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = maze[i][j] === 1 ? '#8e44ad' : '#ecf0f1';
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

// Draw player and goal
function drawPlayer() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(player.x * cellSize + 2, player.y * cellSize + 2, cellSize - 4, cellSize - 4);
}

function drawGoal() {
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(goal.x * cellSize + 2, goal.y * cellSize + 2, cellSize - 4, cellSize - 4);
}

// Check win condition
function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        alert('Congratulations! You escaped the maze!');
        resetGame();
    }
}

// Reset game
function resetGame() {
    player = { x: 0, y: 0 };
    generateMaze();
}

// Handle player movement
window.addEventListener('keydown', (e) => {
    let { x, y } = player;
    if (e.key === 'ArrowUp' && y > 0 && maze[y - 1][x] === 0) player.y--;
    if (e.key === 'ArrowDown' && y < gridSize - 1 && maze[y + 1][x] === 0) player.y++;
    if (e.key === 'ArrowLeft' && x > 0 && maze[y][x - 1] === 0) player.x--;
    if (e.key === 'ArrowRight' && x < gridSize - 1 && maze[y][x + 1] === 0) player.x++;
    checkWin();
    updateGame();
});

// Update game visuals
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawGoal();
    drawPlayer();
}

// Start game loop
updateGame();

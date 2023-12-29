// Get the game container element
const gameContainer = document.getElementById('game-container');

// Create and append game elements dynamically
for (let i = 0; i < 100; i++) {  // 10 columns x 10 rows for a 10x10 grid
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-element');
    gameContainer.appendChild(gameElement);
}

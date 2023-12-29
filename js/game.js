// Your game logic will go here
// Start by selecting the game container and UI container
const gameContainer = document.getElementById('game-container');
const uiContainer = document.getElementById('ui-container');

// Select game info and stats elements
const descriptionElement = document.getElementById('description');
const waveNumberElement = document.getElementById('wave-number');
const enemiesRemainingElement = document.getElementById('enemies-remaining');
const playerMoneyElement = document.getElementById('player-money');

// Initialize variables for game state
let selectedTowerType = null;
let highlightedCell = null;
let waveNumber = 1;
let enemiesRemaining = 0;
let playerMoney = 100;

// Add click event listeners to the game container and UI container
gameContainer.addEventListener('click', handleGameClick);
uiContainer.addEventListener('click', handleTowerOptionClick);

// Function to handle clicks on the game grid
function handleGameClick(event) {
    const clickedElement = event.target;

    // Check if the clicked element is a game element
    if (clickedElement.classList.contains('game-element')) {
        if (selectedTowerType) {
            // Place tower on the clicked cell
            placeTower(clickedElement);
        } else {
            // Highlight the clicked cell
            highlightCell(clickedElement);
        }
    }
}

// Function to handle clicks on tower options in the UI
function handleTowerOptionClick(event) {
    const clickedElement = event.target;

    // Check if the clicked element is a tower option
    if (clickedElement.classList.contains('tower-option')) {
        // Set the selected tower type
        selectedTowerType = clickedElement.dataset.towerType;

        // Clear any previous highlighting
        clearHighlight();
    }
}

// Function to place a tower on the selected cell
function placeTower(cell) {
    // Check if the cell is not occupied by a tower
    if (!cell.querySelector('.tower')) {
        // Check if the player has enough money
        const towerCost = getTowerCost(selectedTowerType);
        if (playerMoney >= towerCost) {
            // Deduct money from the player
            playerMoney -= towerCost;
            updateGameStats();

            // Create a tower element
            const towerElement = document.createElement('div');
            towerElement.classList.add('tower');
            towerElement.textContent = 'T'; // You can customize the appearance

            // Add the tower to the cell
            cell.appendChild(towerElement);

            // Clear the selected tower type and highlighting
            selectedTowerType = null;
            clearHighlight();
        } else {
            alert("Not enough money to build this tower!");
        }
    }
}

// Function to highlight a cell
function highlightCell(cell) {
    // Clear any previous highlighting
    clearHighlight();

    // Add a class to highlight the cell
    cell.classList.add('highlighted');

    // Store the highlighted cell
    highlightedCell = cell;
}

// Function to clear highlighting from all cells
function clearHighlight() {
    // Check if there is a highlighted cell
    if (highlightedCell) {
        // Remove the highlighting class
        highlightedCell.classList.remove('highlighted');

        // Clear the highlighted cell variable
        highlightedCell = null;
    }
}

// Function to update game stats
function updateGameStats() {
    waveNumberElement.textContent = waveNumber;
    enemiesRemainingElement.textContent = enemiesRemaining;
    playerMoneyElement.textContent = `$${playerMoney}`;
}

// Function to start a new wave
function startWave() {
    // Increment wave number
    waveNumber++;

    // Update game stats
    enemiesRemaining = 10 * waveNumber; // You can customize how enemies scale with waves
    updateGameStats();

    // Spawn enemies (you need to implement enemy spawning logic)
    spawnEnemies();
}

// Function to get the cost of a tower type
function getTowerCost(towerType) {
    // You can customize the tower costs based on the type
    switch (towerType) {
        case 'basic':
            return 20;
        case 'rapid':
            return 30;
        case 'splash':
            return 40;
        default:
            return 0;
    }
}

// Example: Function to spawn enemies (replace with your logic)
function spawnEnemies() {
    // You need to implement enemy spawning logic here
    // For simplicity, let's assume enemies are spawned instantly
    setTimeout(() => {
        // Decrease enemies remaining
        enemiesRemaining--;

        // Update game stats
        updateGameStats();

        // Continue spawning enemies until none remain
        if (enemiesRemaining > 0) {
            spawnEnemies();
        } else {
            // All enemies spawned, start the next wave
            alert("Wave Complete!");
            startWave();
        }
    }, 1000); // Delay between enemy spawns (adjust as needed)
}

// Start the first wave
startWave();

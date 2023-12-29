// Get the game container element
const gameContainer = document.getElementById('game-container');

// Get the UI container element
const uiContainer = document.getElementById('ui-container-bottom');

// Initialize variables to store tower and enemy information
let selectedTower = null;
let selectedTowerType = null;
let enemies = [];

// Add a click event listener to the game container
gameContainer.addEventListener('click', handleGameClick);

// Add a click event listener to the UI container
uiContainer.addEventListener('click', handleTowerOptionClick);

// Function to handle game clicks
function handleGameClick(event) {
    // Get the clicked element
    const clickedElement = event.target;

    // Check if the clicked element is a game element
    if (clickedElement.classList.contains('game-element')) {
        // Check if a tower is already selected
        if (selectedTower !== null) {
            // Place the tower on the clicked element
            placeTower(clickedElement);
        } else {
            // No tower selected, highlight the clicked element
            highlightCell(clickedElement);
        }
    }
}

// Function to handle tower option clicks
function handleTowerOptionClick(event) {
    // Get the clicked element
    const clickedElement = event.target;

    // Check if the clicked element is a tower option
    if (clickedElement.classList.contains('tower-option')) {
        // Set the selected tower type
        selectedTowerType = clickedElement.dataset.towerType;

        // Clear highlighting and selected tower in the game container
        clearHighlight();
        selectedTower = null;
    }
}

// Function to place a tower on the clicked element
function placeTower(targetElement) {
    // Example: Create a tower element (you can customize this)
    const towerElement = document.createElement('div');
    towerElement.classList.add('tower');
    towerElement.textContent = 'T';  // Just a placeholder, you can add graphics

    // Set tower characteristics based on the selected tower type
    let towerDamage, towerAttackSpeed, towerRange;

    switch (selectedTowerType) {
        case 'basic':
            towerDamage = 10;
            towerAttackSpeed = 1;
            towerRange = 3;
            break;
        case 'rapid':
            towerDamage = 5;
            towerAttackSpeed = 2;
            towerRange = 2;
            break;
        case 'splash':
            towerDamage = 15;
            towerAttackSpeed = 1.5;
            towerRange = 2.5;
            break;
        // Add more cases for additional tower types
        default:
            towerDamage = 0;
            towerAttackSpeed = 0;
            towerRange = 0;
    }

    // Store tower information (add more details as needed)
    const towerInfo = {
        type: selectedTowerType,
        damage: towerDamage,
        attackSpeed: towerAttackSpeed,
        range: towerRange,
        level: 1,
        position: targetElement.dataset.position,  // Example: store position data
    };

    // Additional logic for tower placement or upgrades can be added here

    // Add the tower to the clicked element
    targetElement.appendChild(towerElement);

    // Clear the selected tower
    selectedTower = null;

    // Remove highlighting from the clicked element
    clearHighlight();
}

// Function to highlight the clicked element
function highlightCell(targetElement) {
    clearHighlight();  // Clear any existing highlight

    // Add a class for highlighting
    targetElement.classList.add('highlighted');

    // Store the selected tower for placement
    selectedTower = targetElement;
}

// Function to clear highlighting from all game elements
function clearHighlight() {
    const gameElements = document.querySelectorAll('.game-element');
    gameElements.forEach(element => {
        element.classList.remove('highlighted');
    });
}

// Function to spawn enemies
function spawnEnemy() {
    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');
    enemyElement.textContent = 'E';  // Just a placeholder, you can add graphics

    // Set enemy characteristics (customize as needed)
    const enemyInfo = {
        health: 20,
        speed: 1,
        reward: 10,
        position: 'start',  // Example: starting position
    };

    // Append the enemy to the starting position
    const startCell = document.querySelector('[data-position="start"]');
    startCell.appendChild(enemyElement);

    // Move the enemy along the path
    moveEnemy(enemyElement, enemyInfo);
}

// Function to move enemies along the path
function moveEnemy(enemyElement, enemyInfo) {
    const path = getPath();  // Replace with your pathfinding logic

    let currentPathIndex = 0;

    function move() {
        // Check if the enemy reached the end of the path
        if (currentPathIndex === path.length) {
            enemyElement.remove();  // Remove the enemy when it reaches the end
            // Implement logic for player damage or other game events if needed
        } else {
            const currentCell = path[currentPathIndex];
            const nextCell = path[currentPathIndex + 1];

            // Calculate the distance between cells
            const distanceX = nextCell.x - currentCell.x;
            const distanceY = nextCell.y - currentCell.y;

            // Move the enemy one step closer to the next cell
            enemyElement.style.transform = `translate(${distanceX * 40}px, ${distanceY * 40}px)`;

            // Update the position in the enemyInfo
            enemyInfo.position = nextCell.position;

            // Move to the next cell in the path
            currentPathIndex++;

            // Schedule the next move
            setTimeout(move, 1000 / enemyInfo.speed);  // Adjust speed as needed
        }
    }

    // Start the movement
    move();

    // Add the enemy to the array for tracking
    enemies.push({
        element: enemyElement,
        info: enemyInfo
    });
}

// Example function to get the path (replace with your pathfinding logic)
function getPath() {
    // This is a simple example; replace it with your pathfinding logic
    const path = [
        { x: 0, y: 0, position: 'start' },
        { x: 1, y: 0, position: 'path' },
        { x: 2, y: 0, position: 'path' },
        // ... continue with the path ...
        { x: 9, y: 9, position: 'end' }
    ];

    return path;
}

// Function to handle tower-enemy interaction (to be implemented)
function handleTowerEnemyInteraction() {
    // Implement logic for towers attacking enemies
    // Check if any tower has enemies within its range and attack them
}

// ... (existing code) ...

// Function to update the game state (to be called in a game loop)
function updateGameState() {
    handleTowerEnemyInteraction();
    // Add any additional logic for game state updates
}

// Example: Set up a game loop
function gameLoop() {
    updateGameState();
    // Schedule the next iteration of the game loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

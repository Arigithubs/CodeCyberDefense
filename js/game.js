// Get the game container element
const gameContainer = document.getElementById('game-container');

// Get the UI container element
const uiContainer = document.getElementById('ui-container-bottom');

// Initialize a variable to store tower information
let selectedTower = null;
let selectedTowerType = null;

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

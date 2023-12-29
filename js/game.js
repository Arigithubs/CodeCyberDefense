// Get the game container element
const gameContainer = document.getElementById('game-container');

// Initialize a variable to store tower information
let selectedTower = null;

// Add a click event listener to the game container
gameContainer.addEventListener('click', handleGameClick);

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

// Function to place a tower on the clicked element
function placeTower(targetElement) {
    // Example: Create a tower element (you can customize this)
    const towerElement = document.createElement('div');
    towerElement.classList.add('tower');
    towerElement.textContent = 'T';  // Just a placeholder, you can add graphics

    // Add the tower to the clicked element
    targetElement.appendChild(towerElement);

    // Store tower information (add more details as needed)
    const towerInfo = {
        type: 'basic',
        level: 1,
        position: targetElement.dataset.position,  // Example: store position data
    };

    // Additional logic for tower placement or upgrades can be added here

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

// Example: Add styles for the highlighted class in your CSS
// .highlighted {
//     border: 2px solid yellow;
// }

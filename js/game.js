// Your game logic will go here
// Start by selecting the game container and UI container
const gameContainer = document.getElementById('game-container');
const uiContainer = document.getElementById('ui-container-bottom');

// Initialize variables for selected tower type and highlighted cell
let selectedTowerType = null;
let highlightedCell = null;

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
    // Create a tower element
    const towerElement = document.createElement('div');
    towerElement.classList.add('tower');
    towerElement.textContent = 'T'; // You can customize the appearance

    // Add the tower to the cell
    cell.appendChild(towerElement);

    // Clear the selected tower type and highlighting
    selectedTowerType = null;
    clearHighlight();
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

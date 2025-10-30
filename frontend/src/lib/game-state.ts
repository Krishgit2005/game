// Save these variables in the window object for access from React
window.gameState = {
    score: 0,
    isGameOver: false,
    isPaused: false
};

// Function to update game state
export function updateGameState(score, isGameOver, isPaused) {
    window.gameState = {
        score,
        isGameOver,
        isPaused
    };
    
    // Dispatch a custom event when the game state changes
    window.dispatchEvent(new CustomEvent('gameStateChanged', {
        detail: { score, isGameOver, isPaused }
    }));
}
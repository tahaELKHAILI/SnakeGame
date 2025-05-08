# Slither Snake Game

Welcome to the **Slither Snake** game! This is a simple and fun browser-based implementation of the classic Snake game, where you control the snake, eat food, and try to avoid crashing into the walls or your own body. The game is built using **HTML**, **CSS**, and **JavaScript**.

## Features

- **Responsive Gameplay**: Control the snake using the arrow keys.
- **Score Tracking**: Displays the score as you eat food.
- **Collision Detection**: Ends the game when the snake collides with the wall or itself.
- **Pause Functionality**: Press 'P' to pause and resume the game.
- **Start/Restart Game**: Press "Enter" to start a new game or restart the game after losing.

## Game Controls

- **Arrow Keys**: Use the arrow keys (`Left`, `Right`, `Up`, `Down`) to control the direction of the snake.
- **P**: Press the `P` key to pause and resume the game.
- **Enter**: Press the `Enter` key to start the game or restart after a game over.

## How the Game Works

- **Grid Setup**: The game grid is set up using three separate `<canvas>` elements:
    - `grid`: For drawing the grid layout.
    - `food`: For displaying the food.
    - `Snake`: For rendering the snake.
  
- **Snake Movement**: The snake is controlled by pressing the arrow keys. The snake grows when it eats food, and the game ends if it collides with the walls or itself.
  
- **Food Generation**: Food appears at random positions within the grid, and the snake must "eat" the food by moving to its location.
  
- **Game Over**: If the snake crashes into the wall or its own body, the game ends. You can restart by pressing `Enter`.

## File Structure

```bash
slither-snake/
├── index.html         # Main HTML file for the game
├── Style.css          # Styles for the game layout
├── Script.js          # JavaScript for game logic
└── README.md          # This file

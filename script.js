//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.querySelector(".scoreBoard");
const pixels = document.querySelectorAll(".pixel");

let snake = [[20, 1]]; // starting position of snake
let food = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]; // random starting position of food
let direction = "right"; // starting direction
let score = 0;
let gameInterval;

// function to update the game state
function update() {
  // move snake in current direction
  let snakeHead = snake[snake.length - 1];
  if (direction === "right") {
    snake.push([snakeHead[0], snakeHead[1] + 1]);
  } else if (direction === "left") {
    snake.push([snakeHead[0], snakeHead[1] - 1]);
  } else if (direction === "up") {
    snake.push([snakeHead[0] - 1, snakeHead[1]]);
  } else if (direction === "down") {
    snake.push([snakeHead[0] + 1, snakeHead[1]]);
  }

  // check if snake has hit food
  if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
    score++;
    scoreBoard.innerHTML = score;
    food = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
  } else {
    snake.shift();
  }

  // check if snake has hit the edge of the game container or its own body
  if (snakeHead[0] < 0 || snakeHead[0] > 39 || snakeHead[1] < 0 || snakeHead[1] > 39 || snake.slice(0, -1).some(p => p[0] === snakeHead[0] && p[1] === snakeHead[1])) {
    clearInterval(gameInterval);
    alert("Game over! Your score: " + score);
  }

  // update the visual representation of the snake and food on the screen
  pixels.forEach(pixel => {
    pixel.classList.remove("snakeBodyPixel", "food");
  });
  snake.forEach(p => {
   

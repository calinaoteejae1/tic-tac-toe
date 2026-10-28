const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
  const cell = event.currentTarget;

  if (cell.textContent !== "" || gameOver) return;

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (checkDraw()) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) return true;
  }
  return false;
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.textContent === "") return false;
  }
  return true;
}

function restartGame() {
  for (let cell of cells) cell.textContent = "";
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's Turn";
}

for (let cell of cells) cell.addEventListener("click", handleClick);
restartButton.addEventListener("click", restartGame);

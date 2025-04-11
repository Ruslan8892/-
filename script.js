const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const modeSelect = document.getElementById("mode-select");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;
let mode = modeSelect.value; 

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleClick(index));
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  if (mode === "bot") {
    if (currentPlayer !== "X") return;
    makeMove(index, "X");
    if (gameActive) {
      setTimeout(botMove, 400);
    }
  } else {
    makeMove(index, currentPlayer);
  }
}

function makeMove(index, player) {
  if (cells[index] !== "") return;
  cells[index] = player;
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Ходить: ${currentPlayer}`;
  }
}

function botMove() {
  const emptyIndices = cells
    .map((val, idx) => (val === "" ? idx : null))
    .filter(v => v !== null);
  if (!gameActive || emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      statusText.textContent = `Переміг: ${cells[a]}`;
      gameActive = false;
      return;
    }
  }

  if (!cells.includes("")) {
    statusText.textContent = "Нічия!";
    gameActive = false;
  }
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  cells = Array(9).fill("");
  gameActive = true;
  statusText.textContent = `Ходить: ${currentPlayer}`;
  renderBoard();
  if (mode === "bot" && currentPlayer === "O") {
    setTimeout(botMove, 400);
  }
});

modeSelect.addEventListener("change", () => {
  mode = modeSelect.value;
  restartBtn.click(); 
});

renderBoard();

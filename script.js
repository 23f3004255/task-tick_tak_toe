const board = document.getElementById('board');
const statusDiv = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let boardState = Array(9).fill('');
let gameActive = true;

const WIN_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const idx = parseInt(cell.getAttribute('data-index'));
  if (!gameActive || boardState[idx] !== '') return;
  boardState[idx] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinnerCells(currentPlayer);
    return;
  } else if (boardState.every(cell => cell !== '')) {
    statusDiv.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return WIN_COMBOS.some(combo =>
    combo.every(idx => boardState[idx] === player)
  );
}

function getWinnerCombo(player) {
  return WIN_COMBOS.find(combo =>
    combo.every(idx => boardState[idx] === player)
  );
}

function highlightWinnerCells(player) {
  const winnerCombo = getWinnerCombo(player);
  if (winnerCombo) {
    winnerCombo.forEach(idx => {
      const cell = board.querySelector(`.cell[data-index="${idx}"]`);
      if (cell) cell.classList.add('winner');
    });
  }
}

function restartGame() {
  boardState = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = "Player X's turn";
  [...board.children].forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}

[...board.children].forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

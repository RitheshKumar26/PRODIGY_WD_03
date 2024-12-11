// Select elements
const msgRef = document.getElementById("message");
const btnRef = document.querySelectorAll(".board__cell");
const newgameBtn = document.querySelector(".popup__restart-btn");
const restartBtn = document.querySelector(".game-restart-btn");

// Variables
let xTurn = true; // To track the turn
let count = 0; // To count the moves

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to enable buttons and hide popup
const enableButtons = () => {
  btnRef.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
  msgRef.parentElement.classList.add("hide");
  msgRef.innerText = "";
};

// Function to disable buttons and show popup
const disableButtons = () => {
  btnRef.forEach((btn) => (btn.disabled = true));
  msgRef.parentElement.classList.remove("hide");
};

// Function to check for a win
const winChecker = () => {
  for (let pattern of winningPattern) {
    const [a, b, c] = pattern;
    const cellA = btnRef[a].innerText;
    const cellB = btnRef[b].innerText;
    const cellC = btnRef[c].innerText;

    if (cellA && cellA === cellB && cellB === cellC) {
      winFunction(cellA);
      return;
    }
  }

  // Check for a draw
  if (count === 9) {
    drawFunction();
  }
};

// Function for when a player wins
const winFunction = (player) => {
  disableButtons();
  msgRef.innerHTML = `&#x1F389; <br> '${player}' Wins!`;
};

// Function for a draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw!";
};

// Add event listeners to buttons
btnRef.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (xTurn) {
      btn.innerText = "X";
      btn.disabled = true;
      xTurn = false;
    } else {
      btn.innerText = "O";
      btn.disabled = true;
      xTurn = true;
    }
    count++;
    winChecker();
  });
});

// Add event listeners for new game and restart
newgameBtn.addEventListener("click", () => {
  xTurn = true;
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  xTurn = true;
  count = 0;
  enableButtons();
});

// Initialize the game on page load
document.addEventListener("DOMContentLoaded", enableButtons);

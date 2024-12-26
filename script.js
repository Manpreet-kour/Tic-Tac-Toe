let arr = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; // To track the number of moves

let arr1 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Reset game function
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Add click event listeners to each box
arr.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.classList.contains("disabled")) {
      return; // Skip if the box is already clicked
    }

    if (turnO) {
      box.innerHTML = "O";
      box.style.fontSize = "8vmin";
      box.style.color = "red";
      turnO = false;
      console.log("O turn");
    } else {
      box.innerHTML = "X";
      box.style.fontSize = "8vmin";
      box.style.color = "blue";
      turnO = true;
      console.log("X turn");
    }

    box.classList.add("disabled"); // Mark the box as clicked
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Check for a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  for (let box of arr) {
    box.classList.add("disabled");
  }
};

// Enable all boxes for a new game
const enableBoxes = () => {
  for (let box of arr) {
    box.classList.remove("disabled");
    box.innerText = "";
  }
};

// Display the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a winner based on patterns
const checkWinner = () => {
  for (let pattern of arr1) {
    let pos1Val = arr[pattern[0]].innerText;
    let pos2Val = arr[pattern[1]].innerText;
    let pos3Val = arr[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Add event listeners for the reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

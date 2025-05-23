const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('.msg');
const newBtn = document.getElementById("new-btn");
const resetBtn = document.getElementById("reset-btn");
// 
// 

const winPattern = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]



let turnO = true;
let count = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(turnO) {
      box.innerText = "O";
      box.style.backgroundColor = "#b8e994"; 
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.backgroundColor = "#f8c291";
      turnO = true;
    }

    chackWinner();

    box.disabled = true;
    count++;
    if(count === 9) {
      msg.innerText = `Game was a Drow`;
      msgContainer.classList.remove('hide');
      resetBtn.style.display = "none";
    }

  })
})



const resetGame = () => {
  turnO = true;
  msgContainer.classList.add("hide");
  count = 0;
  enableBoxes();
}

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "white";
  }
}

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
}

const winner = (winner) => {
  msg.innerText = `Congratulations, \n Winner is ${winner}`;

}


const chackWinner = () => {
  for (const pattern of winPattern) {
    const pos1Val = boxes[pattern[0]].innerText;
    const pos2Val = boxes[pattern[1]].innerText;
    const pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if(pos1Val === pos2Val && pos2Val === pos3Val) {
        msgContainer.classList.remove("hide");
        resetBtn.style.display = "none";

        winner(pos1Val)
        disableBoxes();
      }
    }
  }
}

newBtn.addEventListener("click", () => {
  resetBtn.style.display = "inline";
  resetGame();
});
resetBtn.addEventListener("click", resetGame);

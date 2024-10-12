let turn = "X"
const title = document.querySelector('.title');
const squares = document.querySelectorAll(".square");
const restartBtn = document.querySelector(".restart-btn");
let finished = false;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const chosen=[];

squares.forEach((square,index) =>square.onclick = () => play(square,index));
restartBtn.onclick = () => restart()
const play = (square,index) => {
    square.textContent=turn;
    chosen[index]=square;
    square.classList.add("unclickable");
    checkWinner();
}



const checkWinner = () => {
    let sameSquares;
    for(let i = 0; i < winConditions.length; i++){
        [a,b,c] = winConditions[i];
         sameSquares = [chosen[a],chosen[b],chosen[c]]
        if(sameSquares.every(square=>square?.textContent===turn)){
         finished = true
         break;
        }
    };
    if(finished){
        wins(sameSquares)
    }
    else if(chosen.filter(c=>c!="").length == 9){
        console.log(chosen);
        
        draw();
        finished = true;
    }
    else{
        changeTurn();
    }
}

const wins = (sameSquares)=>{
    title.innerHTML = `Player <span>${turn}</span> Wins!`;
    sameSquares.forEach(square => square.classList.add("winner"));
    squares.forEach(square => !square.classList.contains("unclickable") && square.classList.add("unclickable"))
}

const draw = () => {
    title.innerHTML = `<span>Draw!</span>`;
}

const changeTurn = () => {
    turn = turn === "X" ? "O" : "X";
    title.innerHTML = `<span>${turn}</span>`;
}
const restart = () => {
squares.forEach(square => {
    turn = "X";
    square.classList.remove("unclickable");
    square.classList.remove("winner");
    square.textContent = "";
    chosen.length=0
    finished = false
    title.innerHTML = "X - O <span>Game</span>";
})
}



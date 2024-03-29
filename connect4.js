
    var playerRed = "R";
    var playerYellow = "Y";
    var currentPlayer = playerRed;
    
    var gameOver = false;
    var board;
    var currentColumns;
    var button;

    
    let rows = 6;
    let columns = 7;


    window.onload = function(){
        button = document.querySelector("#start-button");
        button.addEventListener("click", function(){
            if (button.innerHTML == "Start"){
                setGame();
            } else{
                restartGame();
            }
        });
        
    };

function setGame(){
    button.innerHTML = "Restart Game";
    document.getElementById("start-message").innerHTML = "To start again please click the 'Restart' button bellow";
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];
    document.getElementById("game-container").style.display = "block";
    for(let r = 0; r < rows; r++){
        let row =[];
        for(let c = 0; c < columns; c++){
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);

    }
}

function setPiece(){
    if (gameOver){
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
    r = currentColumns[c];
    if(r < 0){
        alert("Column is filled");
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currentPlayer == playerRed){
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
    }

    r -= 1;
    currentColumns[c] = r;
    checkWinner();
}

function checkWinner(){
    //horizontally - sliding window
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] & board[r][c] == board[r][c+2] & board[r][c] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //vertically
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 3; r++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] & board[r][c] == board[r+2][c] & board[r][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //antidiagonally
    for (let r = 0; r < rows - 3; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] & board[r][c] == board[r+2][c+2] & board[r][c] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //diagonally
    for (let r = 3; r < rows; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] & board[r][c] == board[r-2][c+2] & board[r][c] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c){
    let winner = document.getElementById("winner-text");
    if (board[r][c] == playerRed){
        winner.innerHTML = "Player Red Wins!"
    } else{
        winner.innerHTML = "Player Yellow Wins!"
    }

    gameOver = true;
}

function restartGame(){
    gameOver = false;
    currentPlayer = playerRed;
    let boardDiv = document.getElementById("board");
    let child = boardDiv.lastElementChild;
    console.log(child);
    while (child) {
      boardDiv.removeChild(child);
      child = boardDiv.lastElementChild;
    }
    let winner = document.getElementById("winner-text");
    winner.innerHTML = ""
    setGame();
}

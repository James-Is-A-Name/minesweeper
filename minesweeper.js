document.addEventListener('DOMContentLoaded', startGame)



class gameBoard{
  constructor(size){
    
    if(size > 9){
      size = 9;
    }
    if(size < 2){
      size = 2;
    }

    this.cells = [];
    var numRows = size;
    var numCols = size;
    var numMines = Math.floor(size*size/4);
    
    for(var row = 0; row<numRows; row++){
      for(var col = 0; col<numCols; col++){
        var theCellIndex = (row*numCols + col);
        this.cells[theCellIndex] = {};
        this.cells[theCellIndex].row = row;
        this.cells[theCellIndex].col = col;
        this.cells[theCellIndex].isMine = false;
        this.cells[theCellIndex].isMarked = false;
        this.cells[theCellIndex].hidden = true;
        this.cells[theCellIndex].surroundingMines = 0;
      }
    }

    for(var cellIndex = 0; cellIndex < numMines; cellIndex++){
      this.cells[cellIndex].isMine = true;
    }
    
    for(var cellIndex = 0; cellIndex < this.cells.length; cellIndex++){
      var swapTarget = Math.floor(Math.random() * (this.cells.length - cellIndex));

      if(cellIndex !== swapTarget){
        var tempMineValue = this.cells[cellIndex].isMine;
        this.cells[cellIndex].isMine = this.cells[swapTarget].isMine;
        this.cells[swapTarget].isMine = tempMineValue;
      }
    }
  }
}

var boardSize = 6;
var board = new gameBoard(boardSize);





function startGame () {
  // Don't remove this function call: it makes the game work!
  for(var cellIndex in board.cells){
    board.cells[cellIndex].surroundingMines = countSurroundingMines(board.cells[cellIndex]);
  }

  document.addEventListener("click",checkForWin);
  document.addEventListener("contextmenu",checkForWin);

  
  //use notes because to lazy to alter index.html
  document.getElementById("notes").innerHTML = "<button id='restart'>Restart?</button>";
  document.getElementById("notes").innerHTML += "<span>Mines Left</span><span id='mineCount'></span>";
  document.getElementById("restart").addEventListener("click",restartgame);
  
  document.getElementById("mineCount").innerHTML = "?";

  lib.initBoard();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var minesCounted = 0;
  var minesMarked = 0;
  var wrongMark = false;
  for(var cellIndex in board.cells){
    //check if a Mine
    if(board.cells[cellIndex].isMine){
      minesCounted++;
      //check if correctly marked as mine
      if(board.cells[cellIndex].isMarked){
        minesMarked++;
      }
    }
    else if(board.cells[cellIndex].isMarked){
      minesMarked++;
      wrongMark = true;
    }
  }

  document.getElementById("mineCount").innerHTML = (minesCounted - minesMarked);

  if ((minesCounted === minesMarked) && !wrongMark){
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!');
  }
}



function restartgame(){
  board = new gameBoard(boardSize);
  document.getElementsByClassName("board")[0].innerHTML = "";
  
  for(var cellIndex in board.cells){
    board.cells[cellIndex].surroundingMines = countSurroundingMines(board.cells[cellIndex]);
  }

  lib.initBoard();
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surroundingCells = lib.getSurroundingCells(cell.row,cell.col);

  var mineCount = 0;
  for(cellIndex in surroundingCells){
    if(surroundingCells[cellIndex].isMine){
      mineCount++;
    }
  }
  
  return mineCount;
}


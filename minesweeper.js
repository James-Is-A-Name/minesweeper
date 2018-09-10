document.addEventListener('DOMContentLoaded', startGame)


//Feels wrong just hard coding this
var board = {
  cells : [
    {row:0,col:0,isMine:false,isMarked:false,hidden:true},
    {row:0,col:1,isMine:false,isMarked:false,hidden:true},
    {row:0,col:2,isMine:false,isMarked:false,hidden:true},
    {row:1,col:0,isMine:true,isMarked:false,hidden:true},
    {row:1,col:1,isMine:true,isMarked:false,hidden:true},
    {row:1,col:2,isMine:true,isMarked:false,hidden:true},
    {row:2,col:0,isMine:true,isMarked:false,hidden:true},
    {row:2,col:1,isMine:false,isMarked:false,hidden:true},
    {row:2,col:2,isMine:true,isMarked:false,hidden:true}
  ]
}





function startGame () {
  // Don't remove this function call: it makes the game work!
  for(var cellIndex in board.cells){
    board.cells[cellIndex].surroundingMines = countSurroundingMines(board.cells[cellIndex]);
  }

  document.addEventListener("click",checkForWin);
  document.addEventListener("contextmenu",checkForWin);

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var minesCounted = 0;
  var minesFound = 0;
  for(var cellIndex in board.cells){
    //check if a Mine
    if(board.cells[cellIndex].isMine){
      minesCounted++;
      //check if correctly marked as mine
      if(board.cells[cellIndex].isMarked){
        minesFound++;
      }
    }
  }

  if (minesCounted === minesFound){
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!');
  }
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

  return mineCount = 0;
}


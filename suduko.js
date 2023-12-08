function solveSudoku(board) {
    const vacantSpot = findVacantSpot(board);
  
    if (!vacantSpot) {
      // If no vacant spots are found, the Sudoku is solved
      return true;
    }
  
    const [row, col] = vacantSpot;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
        // Try placing the number if it's a valid move
        board[row][col] = num;
  
        // Recursively try to solve the rest of the board
        if (solveSudoku(board)) {
          return true; // If the board is solved, return true
        }
  
        // If the current placement doesn't lead to a solution, backtrack
        board[row][col] = 0;
      }
    }
  
    // No valid number found for this spot, trigger backtracking
    return false;
  }
  
  function findVacantSpot(board) {
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // Find the first empty cell (cell with value 0)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    // If no vacant spots are found, return null
    return null;
  }
  
  function isValidMove(board, row, col, num) {
    // Check if the number is not already in the same row, column, or box
    return (
      !usedInRow(board, row, num) &&
      !usedInColumn(board, col, num) &&
      !usedInBox(board, row - (row % 3), col - (col % 3), num)
    );
  }
  
  function usedInRow(board, row, num) {
    return board[row].includes(num);
  }
  
  function usedInColumn(board, col, num) {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInBox(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + startRow][col + startCol] === num) {
          return true;
        }
      }
    }
    return false;
  }
  
  // Example Sudoku puzzle
  const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],  
  ];
  
  // Solve the Sudoku
  if (solveSudoku(sudokuBoard)) {
    console.log("Sudoku solved:");
    printSudoku(sudokuBoard);
  } else {
    console.log("No solution exists.");
  }
  
  function printSudoku(board) {
    for (let row = 0; row < 9; row++) {
      console.log(board[row].map(spot => (spot === 0 ? '-' : spot)).join(' '));
    }
  }
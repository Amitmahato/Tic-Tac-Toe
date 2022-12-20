export enum Turns {
  X = "X",
  O = "O",
}

export type PlayerTurn = Turns.X | Turns.O;

export type WinningPlayer = PlayerTurn | null;

export type BoardState = Array<Array<WinningPlayer>>;

export type WinResult = {
  winningCells: Array<string>;
  winner: WinningPlayer | null;
};
export const checkWinner: (
  boardState: Array<Array<WinningPlayer>>
) => WinResult = (boardState) => {
  // Check for Diagonal Winner
  const l2rDiagonalWinner =
    boardState[0][0] &&
    boardState[0][0] === boardState[1][1] &&
    boardState[0][0] === boardState[2][2];

  if (l2rDiagonalWinner) {
    const winningCells = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    return {
      winningCells: winningCells.map((cell) => cell.join("-")),
      winner: boardState[0][0],
    };
  }

  const r2lDiagonalWinner =
    boardState[0][2] &&
    boardState[0][2] === boardState[1][1] &&
    boardState[0][2] === boardState[2][0];

  if (r2lDiagonalWinner) {
    const winningCells = [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
    return {
      winningCells: winningCells.map((cell) => cell.join("-")),
      winner: boardState[0][2],
    };
  }

  // Check for Horizontal Winner
  for (let i = 0; i <= 2; i++) {
    const winningCells = [
      [i, 0],
      [i, 1],
      [i, 2],
    ];
    if (
      boardState[i][0] &&
      boardState[i][0] === boardState[i][1] &&
      boardState[i][0] === boardState[i][2]
    ) {
      return {
        winningCells: winningCells.map((cell) => cell.join("-")),
        winner: boardState[i][0],
      };
    }
  }

  // Check for Vertical Winner
  for (let i = 0; i <= 2; i++) {
    const winningCells = [
      [0, i],
      [1, i],
      [2, i],
    ];
    if (
      boardState[0][i] &&
      boardState[0][i] === boardState[1][i] &&
      boardState[0][i] === boardState[2][i]
    ) {
      return {
        winningCells: winningCells.map((cell) => cell.join("-")),
        winner: boardState[0][i],
      };
    }
  }

  return { winningCells: [], winner: null };
};

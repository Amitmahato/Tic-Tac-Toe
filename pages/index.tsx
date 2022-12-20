import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  BoardState,
  checkWinner,
  PlayerTurn,
  Turns,
  WinningPlayer,
} from "../helper/winLogin";
import styles from "../styles/Home.module.css";

interface BoxProps {
  item: string | null;
}

const Box: React.FC<BoxProps> = ({ item }) => {
  return <div className="box">{item}</div>;
};

const INITIAL_BOARD_STATE: BoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getBoardStateCopy = (boardState: BoardState) => {
  return boardState.map((i) => i.map((j) => j));
};
export default function Home() {
  const [turn, setTurn] = useState<PlayerTurn>(Turns.O);
  const [boardState, setBoardState] = useState<BoardState>(
    getBoardStateCopy(INITIAL_BOARD_STATE)
  );
  const [winner, setWinner] = useState<WinningPlayer>(null);
  const [winningCells, setWinningCells] = useState<Array<string>>([]);
  const [boardHistory, setBoardHistory] = useState<Array<BoardState>>([]);

  const toggleTurn = () => {
    turn === Turns.X ? setTurn(Turns.O) : setTurn(Turns.X);
  };

  const onSelect = (position: number[]) => {
    const [i, j] = position;
    if (boardState[i][j] || winner) {
      return;
    }
    const newBoardState = getBoardStateCopy(boardState);
    newBoardState[i][j] = turn;

    setBoardHistory([
      ...boardHistory.map((state) => getBoardStateCopy(state)),
      getBoardStateCopy(boardState),
    ]);
    setBoardState(newBoardState);

    toggleTurn();
  };

  useEffect(() => {
    const foundWinner = checkWinner(boardState);
    if (foundWinner) {
      setWinner(foundWinner.winner);
      setWinningCells(foundWinner.winningCells);
    }
  }, [boardState]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Made With Love 🖤" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.center}>
        <h1>Tic Tac Toe</h1>
        <h4>Turn For: {turn}</h4>
        <div className={styles.board}>
          {boardState.map((row, i) => (
            <div
              key={i}
              className={styles.row}
              style={i == 2 ? { borderBottom: "none" } : {}}
            >
              {row.map((column, j) => (
                <div
                  key={`${i}-${j}`}
                  className={styles.column}
                  style={{
                    cursor: "crosshair",
                    ...(j == 2 && { borderRight: "none" }),
                    ...(column && {
                      cursor: "no-drop",
                      backgroundColor: "gray",
                    }),
                    ...(winner && {
                      cursor: "no-drop",
                    }),
                    ...(winner &&
                      winningCells.length > 0 &&
                      winningCells.includes([i, j].join("-")) && {
                        backgroundColor: "green",
                      }),
                  }}
                  onClick={() => onSelect([i, j])}
                >
                  <Box item={column} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            style={{
              ...(boardHistory.length === 0 && { cursor: "no-drop" }),
            }}
            onClick={() => {
              const lastBoardState = boardHistory.pop();

              toggleTurn();

              lastBoardState && setBoardState(lastBoardState as BoardState);
            }}
            disabled={boardHistory.length === 0}
          >
            Undo
          </button>

          <button
            className={styles.button}
            style={{
              ...(boardHistory.length === 0 && { cursor: "no-drop" }),
            }}
            onClick={() => {
              setBoardState(getBoardStateCopy(INITIAL_BOARD_STATE));
              setBoardHistory([]);
            }}
            disabled={boardHistory.length === 0}
          >
            Reset
          </button>
        </div>
        <h1 style={{ height: "38px", width: "171px" }}>
          {winner && `Winner is ${winner}`}
        </h1>
      </div>
    </div>
  );
}

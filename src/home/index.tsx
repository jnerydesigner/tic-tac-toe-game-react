import { useState } from "react";
import "./style.css";

type BoardState = { [key: string]: number | null };

function getInitialStateBoard() {
  const initialState: BoardState = {};
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      initialState[`${row}-${col}`] = null;
    }
  }

  return initialState;
}

const getKeyFromIndex = (index: number) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  return `${row}-${col}`;
};

const getLabel = (value: number | null) => {
  if (!value) {
    return null;
  }

  return value < 0 ? "o" : "x";
};

function getWinner(value: any) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const sumRow =
        value[`${row}-${col}`] +
        value[`${row}-${col + 1}`] +
        value[`${row}-${col + 2}`];

      if (sumRow === 3 || sumRow === -3) {
        return sumRow;
      }

      const sumColumn =
        value[`${row}-${col}`] +
        value[`${row + 1}-${col}`] +
        value[`${row + 2}-${col}`];

      if (sumColumn === 3 || sumColumn === -3) {
        return sumColumn;
      }

      const sumDiagonalProgressive =
        value[`${row}-${col}`] +
        value[`${row + 1}-${col + 1}`] +
        value[`${row + 2}-${col + 2}`];

      if (sumDiagonalProgressive === 3 || sumDiagonalProgressive === -3) {
        return sumDiagonalProgressive;
      }

      const sumDiagonalReversed =
        value[`${row}-${col}`] +
        value[`${row + 1}-${col - 1}`] +
        value[`${row + 2}-${col - 2}`];

      if (sumDiagonalReversed === 3 || sumDiagonalReversed === -3) {
        return sumDiagonalReversed;
      }
    }
  }

  return null;
}

export function Home() {
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [situation, setSituation] = useState(false);
  const [boardValues, setBoardValues] = useState(getInitialStateBoard);

  function restart() {
    setPlayer(player === 1 ? 1 : -1);
    setBoardValues(getInitialStateBoard);
    setWinner(null);
    setSituation(false);
  }

  function handleClickPlay(key: string) {
    if (winner || boardValues[key]) {
      return;
    }

    const newValues = {
      ...boardValues,
      [key]: player,
    };

    setBoardValues(newValues);

    setPlayer(player * -1);

    const newWinner = getWinner(newValues);

    console.log(newWinner);

    if (newWinner) {
      const winner = newWinner > 0 ? "x" : "o";
      setWinner(winner);
      setSituation(true);
    }
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Tic Tac Toe</h1>
      </div>

      <div className="game">
        <div className="board">
          {Array.from({ length: 9 }).map((_, index) => {
            const key = getKeyFromIndex(index);
            return (
              <button
                key={index}
                className={`play ${player && "mark"}`}
                type="button"
                onClick={() => handleClickPlay(key)}
              >
                <h3>{getLabel(boardValues[key])}</h3>
              </button>
            );
          })}
        </div>
      </div>
      {situation && (
        <div className="result">
          <div className="winner">
            <h1>{winner}</h1>
            <p>Vencedor</p>
            <button className="restart" type="button" onClick={restart}>
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

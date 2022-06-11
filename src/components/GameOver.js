import React, { Fragment } from "react";
import playAgain from "../playAgain.png";

export default function GameOver(props) {
  return (
    props.display ?
    <div id="gameOver">
      <div>
        YOU WON!
      </div>
      <button id="newGame" onClick={props.onNewGame}>
        <img src={playAgain} alt="play again" />
      </button>
    </div>
    : <Fragment />
  )  
}
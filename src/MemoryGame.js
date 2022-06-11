import React, { useEffect } from "react";
import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import game from "./game/index";

export default function MemoryGame() {

  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(game.createCardsFromAnimals());
  }, [])

  function newGame() {
    game.clearCards();
    setCards(game.createCardsFromAnimals());
    setGameOver(false);
  }

  function onFlip(card) {
    game.flipCard(card.id, () => {
      // GameOverCallBack
      setGameOver(true)
    }, () => {
      // NoMatchCallBack
      setCards([...game.cards]);
    })
    setCards([...game.cards])
  }

  return (
    <div>
      <GameBoard onFlip={onFlip} cards={cards} />
      <GameOver display={gameOver} onNewGame={newGame} />
    </div>  
  )
}
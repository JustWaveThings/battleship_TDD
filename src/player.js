function PlayerFactory(name) {
  function getPlayerName() {
    return name;
  }

  function playerAttack(position) {
    console.log(" in playerAttack in player.js", position);
    gameboard.receiveAttack(position);
  }

  function isCurrentPlayer(turn) {
    turn++;
    return turn % 2 === 0 ? true : false;
  }
  let movesList = [];
  function computerAttack(playerGameboard) {
    if (movesList.length > 100) {
      throw new Error("All moves have been made");
    }
    const randomMoveX = Math.floor(Math.random() * 10);
    const randomMoveY = Math.floor(Math.random() * 10);
    let move = `${randomMoveX}, ${randomMoveY}`;
    console.log("move", move);
    if (!movesList.includes(move)) {
      movesList.push(move);
      return move;
    }
    if (movesList.includes(move)) {
      return computerAttack(playerGameboard);
    }
  }

  return {
    getPlayerName,
    playerAttack,
    isCurrentPlayer,
    computerAttack,
  };
}

export default PlayerFactory;

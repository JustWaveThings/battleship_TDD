import domNewMethods from "./dom.js";
import GameboardFactory from "./gameboard.js";
import PlayerFactory from "./player.js";
import ShipFactory from "./shipFactory.js";

const newPlayer = PlayerFactory("TERRY");
const newComputer = PlayerFactory("COMPUTER");
const playerShips = [
  ShipFactory(2),
  ShipFactory(3),
  ShipFactory(3),
  ShipFactory(4),
  ShipFactory(5),
];
const computerShips = [
  ShipFactory(2),
  ShipFactory(3),
  ShipFactory(3),
  ShipFactory(4),
  ShipFactory(5),
];

const newPlayerBoard = GameboardFactory(newPlayer.getPlayerName(), playerShips);
const newComputerBoard = GameboardFactory(
  newComputer.getPlayerName(),
  computerShips
);

const domPlayerBoard = domNewMethods.createGameboard(
  newPlayerBoard.gameboard,
  newPlayer.getPlayerName()
);
const domComputerBoard = domNewMethods.createGameboard(
  newComputerBoard.gameboard,
  newComputer.getPlayerName()
);

const playerBoardContainer = document.querySelector("section.player-board");
const computerBoardContainer = document.querySelector("section.computer-board");
playerBoardContainer.appendChild(domPlayerBoard);
computerBoardContainer.appendChild(domComputerBoard);

domNewMethods.placePlayerShipsAtStart(
  playerShips,
  newPlayerBoard,
  newPlayerBoard.gameboard,
  newPlayer.getPlayerName()
);

domNewMethods.initializeEventListeners(
  playerBoardContainer,
  newPlayerBoard.gameboard,
  newPlayer.getPlayerName()
);

function newGameLoop() {
  newComputerBoard.placeShip(computerShips[4], "0, 0", "vertical");
  newComputerBoard.placeShip(computerShips[3], "3, 3", "horizontal");
  newComputerBoard.placeShip(computerShips[2], "5, 3", "vertical");
  newComputerBoard.placeShip(computerShips[1], "7, 6", "horizontal");
  newComputerBoard.placeShip(computerShips[0], "0, 5", "horizontal");

  domNewMethods.addPlayerAttackListener((coodinates) => {
    newComputerBoard.receiveAttack(coodinates);
  });

  newComputerBoard.receiveAttack();

  newPlayerBoard.receiveAttack();
}

newGameLoop();

export { newComputer, newPlayerBoard, newComputerBoard };

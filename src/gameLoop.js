import domNewMethods from './dom.js';
import GameboardFactory from './gameboard.js';
import PlayerFactory from './player.js';
import ShipFactory from './shipFactory.js';

function newGameLoop() {
	const newPlayer = PlayerFactory('TERRY');
	const newComputer = PlayerFactory('COMPUTER');
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

	const newPlayerBoard = GameboardFactory(newPlayer, playerShips);
	const newComputerBoard = GameboardFactory(newComputer, computerShips);

	console.log(newPlayerBoard.gameboard);
	const domPlayerBoard = domNewMethods.createGameboard(
		newPlayerBoard.gameboard,
		newPlayer.getPlayerName()
	);
	const domComputerBoard = domNewMethods.createGameboard(
		newComputerBoard.gameboard,
		newComputer.getPlayerName()
	);

	const playerBoardContainer = document.querySelector('section.player-board');
	const computerBoardContainer = document.querySelector(
		'section.computer-board'
	);
	playerBoardContainer.appendChild(domPlayerBoard);
	computerBoardContainer.appendChild(domComputerBoard);

	/* 	newComputerBoard.placeShip(playerShips[4], [0, 0], 'vertical');
	newComputerBoard.placeShip(playerShips[3], [3, 3], 'horizontal');
	newComputerBoard.placeShip(playerShips[2], [5, 3], 'vertical');
	newComputerBoard.placeShip(playerShips[1], [7, 6], 'horizontal');
	newComputerBoard.placeShip(playerShips[0], [0, 5], 'horizontal'); */

	/* 	newPlayerBoard.placeShip(playerShips[4], [0, 0], 'horizontal');
	newPlayerBoard.placeShip(playerShips[3], [2, 0], 'horizontal');
	newPlayerBoard.placeShip(playerShips[2], [4, 0], 'horizontal');
	newPlayerBoard.placeShip(playerShips[1], [6, 0], 'horizontal');
	newPlayerBoard.placeShip(playerShips[0], [8, 0], 'horizontal'); */

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
}

newGameLoop();

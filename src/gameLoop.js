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

	const domPlayerBoard = domNewMethods.createGameboard(
		newPlayerBoard.gameboard,
		newPlayer.getPlayerName()
	);
	const domComputerBoard = domNewMethods.createGameboard(
		newComputerBoard.gameboard,
		newComputer.getPlayerName()
	);

	console.log(domPlayerBoard);
	console.log(domComputerBoard);

	const playerBoardContainer = document.querySelector('section.player-board');
	const computerBoardContainer = document.querySelector(
		'section.computer-board'
	);
	playerBoardContainer.appendChild(domPlayerBoard);
	computerBoardContainer.appendChild(domComputerBoard);
}

newGameLoop();

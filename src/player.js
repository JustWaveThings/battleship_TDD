import GameboardFactory from './gameboard.js';

let gameboard = GameboardFactory();
let movesList = [];

function PlayerFactory(name) {
	function getPlayerName() {
		return name;
	}

	function playerMove(x, y) {
		return [x, y];
	}

	function isCurrentPlayer(turn) {
		turn++;
		return turn % 2 === 0 ? true : false;
	}

	function computerMove() {
		const randomMove = Math.floor(
			Math.random() * gameboard.gameboard.flat().length
		);
		let move = gameboard.gameboard.flat()[randomMove];

		if (move[2] === 'empty' && movesList.includes(move) === false) {
			movesList.push(move);
		} else if (move[2] === 'ship' && movesList.includes(move) === false) {
			movesList.push(move);
		} else {
			computerMove();
		}

		return `[${move[0]}, ${move[1]}]`;
	}

	return {
		getPlayerName,
		playerMove,
		isCurrentPlayer,
	};
}

export default PlayerFactory;

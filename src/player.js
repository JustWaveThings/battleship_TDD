let movesList = [];

function PlayerFactory(name, gameboard) {
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

	function computerAttack() {
		const move = computerMove();
		const [x, y] = move;
		gameboard.receiveAttack(move);
		return move;
	}
	function computerMove() {
		const randomMove = Math.floor(
			Math.random() * gameboard.gameboard.flat().length
		);
		let move = gameboard.gameboard.flat()[randomMove];

		if (
			move[2] === 'empty' ||
			move[2] === 'buffer' ||
			(move[2] === 'ship' && movesList.includes(move) === false)
		) {
			movesList.push(move);
		} else {
			return computerMove();
		}

		return [move[0], move[1]];
	}

	return {
		getPlayerName,
		playerMove,
		isCurrentPlayer,
		computerAttack,
	};
}

export default PlayerFactory;

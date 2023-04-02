function PlayerFactory(name, gameboard) {
	let computerMovesList = [];
	function getPlayerName() {
		return name;
	}

	function playerMove(x, y) {
		return [x, y];
	}
	function playerAttack(move) {
		gameboard.receiveAttack(move);
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
			(move[2] === 'ship' && computerMovesList.includes(move) === false)
		) {
			computerMovesList.push(move);
			console.log(computerMovesList, 'computerMovesList');
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
		playerAttack,
	};
}

export default PlayerFactory;

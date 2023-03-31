function GameboardFactory() {
	const gameboard = Array.from({ length: 10 }, (_, i) =>
		Array.from({ length: 10 }, (_, j) => [i, j])
	);

	// add starting status to each square on the board of empty - but keep the rest for future use
	// empty
	// ship
	// miss
	// hit
	// sunk
	// buffer

	// add 'empty' to each space on the board at initialization
	gameboard.map(row => {
		row.map(space => {
			space.push('empty');
		});
	});

	function placeShip(ship, bowPosition, axis) {
		const [x, y] = bowPosition;
		const shipLength = ship.length;

		const tentShipCoords = horizonatalOrVerticalPlacement(
			axis,
			shipLength,
			x,
			y
		);

		tentShipCoords.forEach(space => {
			if (space[2] === 'empty') {
				space[2] = 'ship';
			} else {
				throw new Error('Invalid ship placement on board');
			}
		});
		shipGiveOneSpaceBuffer();
	}

	function shipGiveOneSpaceBuffer() {
		const relativePositionOfSurroundingSquares = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];
		gameboard.forEach((row, i) => {
			row.forEach((space, j) => {
				if (space[2] === 'ship') {
					relativePositionOfSurroundingSquares.forEach(([x, y]) => {
						const bufferRow = i + x;
						const bufferCol = j + y;
						// guard clause...
						if (
							bufferRow < 0 ||
							bufferRow > gameboard.length ||
							bufferCol < 0 ||
							bufferCol > row.length
						) {
							return;
						}

						const bufferSpace = gameboard[i + x][j + y];
						if (bufferSpace[2] === 'empty') {
							bufferSpace[2] = 'buffer';
						}
					});
				}
			});
		});
	}

	function horizonatalOrVerticalPlacement(axis, shipLength, x, y) {
		let tentativeShipCoords = [];
		if (axis === 'horizontal') {
			if (x + shipLength > 10) {
				throw new Error('Invalid ship placement off board');
			}
			for (let i = 0; i < shipLength; i++) {
				const shipPos = gameboard[x][y + i];
				tentativeShipCoords.push(shipPos);
			}
		}
		if (axis === 'vertical') {
			if (y + shipLength > 10) {
				throw new Error('Invalid ship placement off board');
			}
			for (let i = 0; i < shipLength; i++) {
				const shipPos = gameboard[x + i][y];
				tentativeShipCoords.push(shipPos);
			}
		}

		return tentativeShipCoords;
	}

	return {
		gameboard,
		placeShip,
	};
}

export default GameboardFactory;

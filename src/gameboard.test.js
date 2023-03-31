import GameboardFactory from './gameboard';
import ShipFactory from './shipFactory';

/*
write tests for gameboard factory function

-place ships at valid positions (on board and not overlapping other ships, 1 space gap between ships)
-receiveAttack that takes pair of coordinates and determines if it is a hit or miss and if it's a hit it sends the hit to the correct ship
-keep track of missed attacks so that the same spot can't be attacked twice / they can be displayed(but not testing the display part)
- board can report if ships have been sunk

gameboard is a private interface so it can't be manipulated directly, but should have a public interface that can be consumed by the

What is the public interface for the gameboard?

- placeShip (receives input, returns error if invalid)
- receiveAttack (receives input passes it to the correct ship or reports miss to missedAttacks)
- allShipsSunk (reports output maybe should be tested in the receiving function)
- missedAttacks (reports output maybe should be tested in the receiving function)
- ships (reports hit output from receiveAttack to the correct ship)

*/

describe('GameboardFactory', () => {
	let gameboard;
	beforeEach(() => {
		gameboard = GameboardFactory();
	});

	describe('placeShip', () => {
		test('should pass a test to confirm a square is empty as sanity check and board exists', () => {
			expect(gameboard.gameboard[0][4][2]).toBe('empty');
		});
		test('should place a single ship at valid position on an empty squares', () => {
			// Test placing ships at valid positions
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			expect(gameboard.gameboard[0][4][2]).toBe('ship');
		});

		test('should not place ships on invalid positions off board', () => {
			// Test placing ships on invalid positions and checking for error
			expect(() =>
				gameboard.placeShip(ShipFactory(5), [10, 10], 'horizontal')
			).toThrow('Invalid ship placement off board');
		});

		test('should not place ships on invalid positions on board', () => {
			// Test placing ships on invalid positions and checking for error
			gameboard.placeShip(ShipFactory(5), [0, 0], 'horizontal');
			expect(() =>
				gameboard.placeShip(ShipFactory(5), [0, 4], 'horizontal')
			).toThrow('Invalid ship placement on board');
		});

		test('should place a 1 space buffer around newly placed ship', () => {
			// Test placing ships with less than a 1 space gap and checking for error
			gameboard.placeShip(ShipFactory(5), [0, 0], 'horizontal');
			expect(gameboard.gameboard[0][5][2]).toBe('buffer');
		});
	});

	describe('receiveAttack', () => {
		test('should mark a hit on a ship when attacked', () => {
			// Test attacking a ship and checking for a hit
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([0, 0]);
			expect(gameboard.gameboard[0][0][2]).toBe('hit');
		});

		test('should mark a miss when no ship is attacked', () => {
			// Test attacking an empty spot and checking for a miss
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([1, 0]);
			expect(gameboard.gameboard[1][0][2]).toBe('miss');
		});

		test('should not allow the same spot to be attacked twice', () => {
			// Test attacking the same spot twice and checking for error
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([0, 0]);
			gameboard.receiveAttack([0, 0]);
			expect(() => gameboard.receiveAttack([0, 0])).toThrow(
				'You already attacked this space'
			);
		});
	});

	describe.skip('allShipsSunk', () => {
		test('should report true when all ships have been sunk', () => {
			// Test sinking all ships and checking for true
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([0, 0]);
			gameboard.receiveAttack([0, 1]);
			gameboard.receiveAttack([0, 2]);
			gameboard.receiveAttack([0, 3]);
			gameboard.receiveAttack([0, 4]);
			expect(gameboard.allShipsSunk()).toBe(true);
		});

		test('should report false when not all ships have been sunk', () => {
			// Test not sinking all ships and checking for false
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([0, 0]);
			gameboard.receiveAttack([0, 1]);
			gameboard.receiveAttack([0, 2]);
			gameboard.receiveAttack([0, 3]);
			expect(gameboard.allShipsSunk()).toBe(false);
		});
	});

	describe.skip('missedAttacks', () => {
		test('should keep track of missed attacks', () => {
			// Test missed attacks and checking the missedAttacks array
			gameboard.receiveAttack([0, 0]);
			gameboard.receiveAttack([0, 1]);
			gameboard.receiveAttack([0, 2]);
			gameboard.receiveAttack([0, 3]);
			gameboard.receiveAttack([0, 4]);
			expect(gameboard.missedAttacks).toEqual([
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4],
			]);
		});
	});

	describe.skip('ships', () => {
		test('should report hit output from receiveAttack to the correct ship', () => {
			// Test attacking a ship and checking if the hit is reported to the correct ship
			const ship = ShipFactory(5);
			gameboard.placeShip(ship, [0, 0], 'horizontal');
			gameboard.receiveAttack([0, 0]);
			expect(gameboard.ships[0].hits).toEqual(1);
		});
	});
});

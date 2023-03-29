import shipFactory from './shipFactory';

/*
tests  for  shipFactory function

test only public interface -- try to follow sandi metz's rules

Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.


what are the public interface methods of shipFactory?
- length
- hit
- isSunk
- numberOfHits
*/

describe('shipFactory', () => {
	describe('length', () => {
		it('should return the length of the ship', () => {
			const ship = shipFactory(5);
			expect(ship.length).toBe(5);
		});
	});

	describe('hit', () => {
		it('should increment the number of hits', () => {
			const ship = shipFactory(5);
			ship.hit();
			expect(ship.numberOfHits).toBe(1);
		});
	});

	describe('isSunk', () => {
		it('should return false if the ship has not been sunk', () => {
			const ship = shipFactory(5);
			expect(ship.isSunk).toBe(false);
		});

		it('should return true if the ship has been sunk', () => {
			const ship = shipFactory(5);
			for (let i = 0; i < 5; i++) {
				ship.hit();
			}
			expect(ship.isSunk).toBe(true);
		});
	});
});

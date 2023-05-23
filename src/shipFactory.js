/*
Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
*/
function ShipFactory(length) {
  const ship = {
    length,
    hits: 0,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.hits === this.length;
    },
  };
  const publicShip = {
    get length() {
      return ship.length;
    },
    get isSunk() {
      return ship.isSunk();
    },
    hit() {
      ship.hit();
    },
    get numberOfHits() {
      return ship.hits;
    },
  };
  return publicShip;
}

export default ShipFactory;

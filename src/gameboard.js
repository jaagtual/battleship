function Gameboard() {
    const _gridSize = 10
    const _shipGrid = Array(_gridSize).fill().map(() => Array(_gridSize).fill(false))
    const _attackGrid = Array(_gridSize).fill().map(() => Array(_gridSize).fill(false))

    const _directionIsValid = direction => ['up', 'down', 'left', 'right'].includes(direction.toLowerCase())

    const _coordinateIsOutOfBounds = coordinate => {
        const [row, col] = coordinate
        return row >= _gridSize || col >= _gridSize
    }
    const _shipIsInBounds = (shipLength, origin, direction) => {
        const [row, col] = origin

        if (_coordinateIsOutOfBounds(origin)) return false

        switch (direction) {
            case 'up':
                return shipLength <= row + 1
            case 'down':
                return shipLength <= _gridSize - row
            case 'left':
                return shipLength <= col + 1
            case 'right':
                return shipLength <= _gridSize - col
        }
    }

    const placeShip = (ship, origin, direction) => {
        direction = direction.toLowerCase()
        const [row, col] = origin
        const shipLength = ship.getLength()

        if (!_directionIsValid(direction) || !_shipIsInBounds(shipLength, origin, direction)) return null

        for (let i = 0; i < shipLength; i++) {
            switch (direction) {
                case 'up':
                    _shipGrid[row - i][col] = ship
                    break
                case 'down':
                    _shipGrid[row + i][col] = ship
                    break
                case 'left':
                    _shipGrid[row][col - i] = ship
                    break
                case 'right':
                    _shipGrid[row][col + i] = ship
                    break
            }
        }
        return _shipGrid
    }

    const receiveAttack = ({ attackCoordinate, attackGrid = _attackGrid, shipGrid = _shipGrid }) => {
        const [row, col] = attackCoordinate

        if (_coordinateIsOutOfBounds(attackCoordinate)) return null
        if (!!attackGrid[row][col]) return null

        // record attack
        attackGrid[row][col] = true

        // if it's a ship, hit it
        const ship = shipGrid[row][col]
        if (!!ship) ship.hit()

        return attackGrid
    }

    return {
        placeShip,
        receiveAttack
    }
}

module.exports = Gameboard
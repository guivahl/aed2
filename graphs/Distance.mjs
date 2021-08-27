import { randomInt } from 'crypto'

const MIN_DISTANCE = 1 
const MAX_DISTANCE = 1000

class Distance {
    constructor(firstCity, secondCity, kilometers = randomInt(MIN_DISTANCE, MAX_DISTANCE)) {
        this.firstCity = firstCity
        this.secondCity = secondCity
        this.kilometers = kilometers
    }
}

export default Distance
import { randomInt } from 'crypto'

import City from './City.mjs';
import Distance from './Distance.mjs';

class Graph {
    constructor() {
        this.cities = []
        this.distances = []
    }

    addCity(name) {
        if (this.checkCitiesLimit()) {
            console.log('Cities limit reached!')
            return 
        }
        const city = new City(name)

        this.cities.push(city);
    }

    addDistance(firstCity, secondCity, value) {
        const distance = new Distance(firstCity, secondCity, value)
        
        this.distances.push(distance);
    }

    checkCityNameAlreadyRegistered (name) {
        return this.cities.find(city => city.name === name)
    }

    checkCitiesLimit () {
        return this.cities.length >= 20
    }

    checkValidDistance (firstCity, secondCity) {
        const isValidCity = !(firstCity === secondCity || this.distances.find(distance => 
            (distance.firstCity === firstCity && distance.firstCity === secondCity) ||
            (distance.firstCity === secondCity && distance.firstCity === firstCity)
        ))

        return isValidCity
    }

    getRandomCity () {
        const randomSize = randomInt(this.cities.length)
        
        return this.cities[randomSize]
    }

    list () {
        console.log('Listagem de cidades:  \n')
        this.cities.forEach((city, index) => console.log(`Vértice número ${index + 1} possui o nome: ${city.name}`))
        
        console.log('\nListagem de distâncias:')
        this.distances.forEach((distance, index) => 
            console.log(`Aresta número ${index + 1} possui a distância ${distance.kilometers}km e une os vértices ${distance.firstCity} e ${distance.secondCity}`)
        )
    
    }
}

export default Graph
import Map from '../Map.mjs'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const defaultCities = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'
]

const defaultDistances = [
    { firstCity: 'a', secondCity: 'b', distance: 4 },
    { firstCity: 'c', secondCity: 'd', distance: 7 },
    { firstCity: 'c', secondCity: 'i', distance: 2 },
    { firstCity: 'c', secondCity: 'f', distance: 4 },
    { firstCity: 'd', secondCity: 'e', distance: 9 },
    { firstCity: 'e', secondCity: 'f', distance: 10 },
    { firstCity: 'f', secondCity: 'g', distance: 2 },
    { firstCity: 'g', secondCity: 'h', distance: 1 },
    { firstCity: 'a', secondCity: 'h', distance: 8 },
    { firstCity: 'b', secondCity: 'c', distance: 8 },
    { firstCity: 'h', secondCity: 'i', distance: 7 },
    { firstCity: 'b', secondCity: 'h', distance: 11 },
    { firstCity: 'g', secondCity: 'i', distance: 6 },
    { firstCity: 'd', secondCity: 'f', distance: 14 }
]

const createMap = (cities = defaultCities, distances = defaultDistances) => {
    const map = new Map()

    cities.forEach(city => {
        if (!map.checkCityNameAlreadyRegistered(city)) map.addCity(city)
    })

    distances.forEach(({
        firstCity,
        secondCity,
        distance
     }) =>
        map.addDistance(firstCity, secondCity, distance)
    )

    return map
}

const kruskal = (map) => {
    const citiesNames = map.getAllCities().map(({ name }) => name)
    const rawDistances = map.getAllDistances()

    const formattedCities = citiesNames.map(name => [name])
    
    const { initialMap, distances } = rawDistances.reduce((acc, distance) => {
        const indexFirstCity = acc.initialMap.findIndex(element => element.find(item => item === distance.firstCity))
        const indexSecondCity = acc.initialMap.findIndex(element => element.find(item => item === distance.secondCity))


        if (indexFirstCity >= 0 && indexSecondCity >= 0 && indexFirstCity !== indexSecondCity) {
            acc.initialMap[indexFirstCity] = [...acc.initialMap[indexFirstCity], ...acc.initialMap[indexSecondCity]]
            acc.initialMap.splice(indexSecondCity, 1)

            acc.distances.push(distance)
        }

        return acc
    }, { initialMap: formattedCities, distances: [] })

    const kruskalMap = createMap(citiesNames, distances)

    return kruskalMap
}

const main = async () => {
    const map = createMap()

    console.log('Grafo inicial: ')

    map.list()

    map.sortByDistances()

    console.log('\nGrafo após aplicação de algoritmo de Kruskal: ')

    const kruskalMap = kruskal(map)

    kruskalMap.list()
}


main().then(() => process.exit(0))
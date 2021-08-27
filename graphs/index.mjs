import Map from './Map.mjs'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
  
const question = (msg) => new Promise((resolve, reject) => rl.question(msg, answer => resolve(answer)))

const defaultCities = [
    'São Paulo', 'Porto Alegre', 'Dubai', 'Santiago',
    'Buenos Aires', 'Los Angeles', 'New York', 'Miami',
    'Londres', 'Pequim', 'Cairo', 'Auckland',
    'Amsterdã', 'Barcelona', 'Lisboa','Roma', 
    'Seul', 'Atenas', 'Cancun', 'Moscou'
]

const defaultMap = (map) => {
    defaultCities.forEach(city => {
        if (!map.checkCityNameAlreadyRegistered(city)) map.addCity(city)
    })

    Array.from({ length: defaultCities.length }).forEach(() => {
        const firstCity = map.getRandomCity()
        const secondCity = map.getRandomCity()

        map.addDistance(firstCity.name, secondCity.name)
    })
}

const readMap = async (map) => {
    let shouldAddNewCity, shouldAddNewDistance

    do {
        const city = await question('Qual nome da cidade?\n')

        if (!map.checkCityNameAlreadyRegistered(city)) map.addCity(city)

        shouldAddNewCity = await question('Deseja adicionar nova cidade?\n1. Sim\n2. Não\n')
    } while (shouldAddNewCity !== '2' || map.checkCitiesLimit())   
    
    do {
        const firstCity = await question('Qual nome da primeira cidade que deseja conectar?\n')
        const secondCity = await question('Qual nome da segunda cidade que deseja conectar?\n')
        const distance = await question('Qual a distância entre as duas cidades?\n')

        if (map.checkCityNameAlreadyRegistered(firstCity) && map.checkCityNameAlreadyRegistered(secondCity) && map.checkValidDistance(firstCity, secondCity))  
            map.addDistance(firstCity, secondCity, distance)

        shouldAddNewDistance = await question('Deseja adicionar nova aresta?\n1. Sim\n2. Não\n')
    } while (shouldAddNewDistance !== '2')
}


const main = async () => {
    const map = new Map()

    const shouldUseDefaultCities = await question('Deseja utilizar as cidades pré cadastradas ou inserir novas?\n1. Pré cadastradas\n2. Novas\n').catch(error => console.log(error))

    try {
        switch (shouldUseDefaultCities) {
            case '1':
                defaultMap(map)
                break;        
            case '2':
                await readMap(map)
                break;
            default:
                break;
        }  
    } catch (error) {
        console.log(error)
    } finally {
        map.list()
    }
    
}

main().then(() => process.exit(0))
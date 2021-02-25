const db = require('./models')

const test = async () => {
    try {
        const createdPokemon = await db.pokemon.create({
            name: 'pikachu'
        })
        console.log('✅ Created a', createdPokemon.name)
    
        const foundPokemon = await db.pokemon.findOne({
            where: {
                name: 'pikachu'
            }
        })
        console.log('✅ Found a', foundPokemon.name)
    } catch (err) {
        console.log('❌ Error in dbTest')
        console.log(err)
    }
}

test();
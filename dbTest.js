const db = require('./models')

const testPokemon = async () => {
    try {
        const newPokemon = await db.pokemon.create({
            name: 'pikachu'
        })
        console.log('✅ Created a', newPokemon.name)
    
        const foundPokemon = await db.pokemon.findOne({
            where: {
                name: 'pikachu'
            }
        })
        console.log('✅ Found a', foundPokemon.name)
    } catch (err) {
        console.log('❌ Error in dbTest w/ pokemon')
        console.log(err)
    }
}

// testPokemon();

const testUsers = async () => {
    try {
        const newUser = await db.user.create({
            username: "test",
            password: "test"
        })
        console.log('✅ Created a new user:', newUser.username)

        const foundUser = await db.user.findOne({
            where: {
                username: 'test'
            }
        })
        console.log('✅ Found a user:', foundUser.username)
    } catch (err) {
        console.log('❌ Error in dbTest w/ users')
        console.log(err)
    }
}
// testUsers()

const testManyToMany = async () => {
    try {
        const newPokemon = await db.pokemon.create({ name: 'Pikachu' })
        const user = await db.user.findOne({ username: 'test' })

        user.addPokemon(newPokemon);
    } catch (err) {
        console.log(err)
    }
}
testManyToMany();
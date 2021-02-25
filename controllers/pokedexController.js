const router = require('express').Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151'
    const response = await axios.get(pokemonUrl)
    const pokemons = response.data.results
    console.log(pokemons)
    res.render('pokedex/index', { pokemons: pokemons })
})

module.exports = router
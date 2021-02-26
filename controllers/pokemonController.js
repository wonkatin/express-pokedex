const router = require('express').Router()
const db = require('../models')
const axios = require('axios')


router.get('/', async (req, res) => {
    try {
        const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151'
        const response = await axios.get(pokemonUrl)
        const pokemons = response.data.results
        res.render('pokemon/index', { pokemons: pokemons })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:name', async (req, res) => {
    try {
        const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
        const response = await axios.get(pokemonUrl)
        const pokemon = response.data
        res.render('pokemon/show', { pokemon: pokemon })

    } catch (err) {
        // console.log(err)
        res.redirect('/pokemons')
    }
})

router.post('/', async (req, res) => {
    try {
        const [newPokemon, created] = await db.pokemon.findOrCreate({
            where: { 
                name: req.body.pokemonname 
            }
        })
        // console.log(created);
        res.locals.user.addPokemon(newPokemon);
        res.redirect(`/users/${res.locals.user.id}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
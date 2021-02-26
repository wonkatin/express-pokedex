const router = require('express').Router()
const db = require('../models')
const axios = require('axios')


router.get('/', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { id: res.locals.user.id }, 
            include: db.pokemon
        })

        // console.log(user)
        res.render('pokemon/index', { pokemons: user.dataValues.pokemons } )
    } catch (err) {
        console.log(err)
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
        res.redirect(`/pokemons`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
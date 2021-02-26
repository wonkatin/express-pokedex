const router = require('express').Router()
const db = require('../models')
const model = require('../models')

router.get('/', async (req, res) => {
    try {
        const pokemons = await model.pokemon.findAll({ raw: true})
        res.render('pokemon/index', {pokemons: pokemons})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        const [newPokemon, created] = await model.pokemon.findOrCreate({
            where: { name: req.body.name }
        })
        res.redirect('/pokemon')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router
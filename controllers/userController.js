const { response } = require('express');
const db = require('../models');

const router = require('express').Router()

router.get('/:id', async (req, res) => {
    // const favorites = 
    
    try {
        const user = await db.user.findByPk(req.params.id, { include: db.pokemon })
        console.log(user.dataValues.pokemons)
        // console.log(user)
        res.render('user/show', { pokemons: user.dataValues.pokemons } )
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
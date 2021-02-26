/* Required Modules and Variables */
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const cryptoJS = require('crypto-js')
const db = require('./models')
const axios = require('axios')

const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000

/* Middleware */
app.use(require('morgan')('dev'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static('public'))
app.use(require('cookie-parser')())

// Checks cookie to determine whether there's a logged in user
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.secret).toString(cryptoJS.enc.Utf8)

        // console.log(decryptedId);

        const user = await db.user.findOne({
            where: {
                id: decryptedId
            }
        })

        res.locals.user = user
    } else {
        res.locals.user = null
    }

    next()
})



/* Controllers */
<<<<<<< HEAD
app.use('/pokemon', require('./controllers/pokemonController'))
=======
app.use('/pokemons', require('./controllers/pokemonController'))
app.use('/auth', require('./controllers/authController'))
>>>>>>> 3f75f7f4cc24af64568bcded24cc4869acfcddbb

/* Routes */
app.get('/', async (req, res) => {
    try {
        const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151'
        const response = await axios.get(pokemonUrl)
        const pokemons = response.data.results
        res.render('index', { pokemons: pokemons })
    } catch (err) {
        console.log(err)
        res.render('index', { pokemons: [] })
    }
})


// Start the server!
app.listen(PORT, () => {
    console.log('Server listening on port:', PORT)
    rowdyResults.print()
})
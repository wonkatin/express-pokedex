/* Required Modules and Variables */
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const model = require('./models')
const axios = require('axios')
// const methodOverride = require('method-override')
// const cookieParser = require('cookie-parser')
// const cryptojs = require('crypto-js')
// const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 3000;
const app = express()

const rowdyResults = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
// app.use(methodOverride('_method'))
// app.use(cookieParser())

/* Controllers */

app.use('/pokemon', require('./controllers/pokemonsController'))

/* Routes */
// app.get('/', async (req, res) => {
//     res.render('index')
// })

app.get('/', async (req, res) => {
    try {
        const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
        const response = await axios.get(pokeURL)
        const pokemons = response.data.results
        // console.log(response)
        res.render('index', { pokemons: pokemons })
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    rowdyResults.print()
})
/* Required Modules and Variables */
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const rowdy = require('rowdy-logger')

const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000

/* Middleware */
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static('public'))

/* Controllers */


/* Routes */
app.get('/', (req, res) => {
    res.send('hello world!')
})


//Start the server!
app.listen(PORT, () => {
    console.log('Server listening on port:', PORT)
    rowdyResults.print()
})
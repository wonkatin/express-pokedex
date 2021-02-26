const router = require('express').Router()
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')
const db = require('../models')

router.get('/new', (req, res) => {
    res.render('auth/new', { errors: null })
})

router.get('/login', (req, res) => {
    res.render('auth/login', { errors: null })
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.post('/', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    try {
        if(!req.body.username || !req.body.password) {
            res.render('auth/new', { errors: 'Invalid username/password'})
            return;
        }
        
        const user = await db.user.create({
            username: req.body.username,
            password: hashedPassword
        })

        const encryptedId = AES.encrypt(user.id.toString(), process.env.secret).toString()
        res.cookie('userId', encryptedId)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.render('auth/new', { errors: 'Error creating user, try again w/ different name?'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {  username: req.body.username }
        })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), process.env.secret).toString()
            res.cookie('userId', encryptedId)
            res.redirect('/')
        } else {
            res.render('auth/login', { errors: "Invalid email/password" })
        }         
    } catch (err) {
        console.log(err)   
        res.render('auth/login', { errors: "Invalid email/password" })
    }

})

module.exports = router
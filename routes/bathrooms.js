let express = require('express')
let router = express.Router()

router.get('/bathroom', (req, res) => {
    res.send('requested')
})

router.get('/bathroom/:name', (req, res) => {
    res.send(`requested ${req.params.name}`)
})

router.get('/error', (req, res) =>{
    throw new Error('forced error')
})

module.exports = router
let BathroomModel = require('../models/bathroom.module')
let express = require('express')
let router = express.Router()

router.get('/bathroom', (req, res) => {
    BathroomModel.find((err, bathrooms) => {
        if(err) {
            res.send(err)
        } else{
            res.json(bathrooms)
        }
    })
})

router.post('/bathroom', (req, res) => {

    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    let model = new BathroomModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/bathroom/:name', (req, res) => {
    if(!req.query._id){
        return res.status(400).send('Request ID is missing')
    }
    BathroomModel.findOne({
        _id: req.query._id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.get('/error', (req, res) =>{
    throw new Error('forced error')
})

module.exports = router
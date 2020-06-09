let BathroomModel = require('../models/bathroom.module')
let express = require('express')
let router = express.Router()

//get all bathrooms
router.get('/bathroom', (req, res) => {
    BathroomModel.find((err, bathrooms) => {
        if(err) {
            res.send(err)
        } else{
            res.json(bathrooms)
        }
    })
})

//add bathroom
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

router.post('/bathroom/name', (req, res) => {
    var brName = req.body.name;
    BathroomModel.findOne({"name" : brName}, (err, bathroom) =>{
        if(!err && bathroom != null && brName != null){
            res.json(bathroom);
        }
        else{
            res.status(500).json(err);
        }
    })
})

//get specific bathroom
router.get('/bathroom/:id', (req, res) => {
    BathroomModel.findOne({ _id: req.params.id }, (err, bathroom) => {
        if(err){
            res.json({ error: err});
        }
        else if(bathroom === null){
            res.json({error: "Bathroom does not exist"});
        }
        else {
            res.json({bathroom: bathroom});
        }
    });
})

//change rating, add comments
router.patch('/bathroom/:id', (req, res) => {
    BathroomModel.findOneAndUpdate({ _id: req.params.id}, {rating: req.body.rating, numRatings: req.body.numRatings, comments: req.body.comments}, {upsert: true}, function(err, doc){
        if(err) return res.send(500, {error: err});
        return res.send("Successfully updated.");
    });
})


router.get('/error', (req, res) =>{
    throw new Error('forced error')
})

module.exports = router
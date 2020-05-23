let mongoose = require('mongoose')

let BathroomSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: false,
    },
    gender: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        require: true,
        default: 0.0
    },
    longitude: {
        type: Number,
        require: true,
        default: 0.0
    },
    openTime: {
        type: Number
    },
    closeTime: {
        type: Number
    }

})

var Bathroom = mongoose.model('Bathroom', BathroomSchema);
module.exports = Bathroom;

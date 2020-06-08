let mongoose = require('mongoose')

let BathroomSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    gender: {
        type: String,
        require: true
    },
    latitude: {
        type: String,
        require: true,
        default: "0.0"
    },
    longitude: {
        type: String,
        require: true,
        default: "0.0"
    },
    openTime: {
        type: String
    },
    closeTime: {
        type: String
    },
    username: {
        type: String,
        require: false
    },
    rating: {
        type: Number,
    }, 
    comments: {
        type: Array,
    }

})

var Bathroom = mongoose.model('Bathroom', BathroomSchema);
module.exports = Bathroom;

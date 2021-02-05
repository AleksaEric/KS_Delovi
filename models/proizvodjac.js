const mongoose = require('mongoose')

const proizvodjacShema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Proizvodjac', proizvodjacShema)
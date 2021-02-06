const mongoose = require('mongoose')

const proizvodjacSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Proizvodjac', proizvodjacSchema)
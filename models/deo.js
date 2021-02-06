const mongoose = require('mongoose')

const deoSchema = new mongoose.Schema({
    naziv:{
        type: String,
        required: true
    },
    stanje:{
        type: Number,
        required: true
    },
    proizvodjac: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Proizvodjac'

    }

})

module.exports = mongoose.model('Deo', deoSchema)
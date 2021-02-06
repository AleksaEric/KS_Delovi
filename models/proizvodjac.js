const mongoose = require('mongoose')
const Deo = require('./deo')

const proizvodjacSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

proizvodjacSchema.pre('remove', function(next){
    Deo.find({ proizvodjac: this.id }, (err, delovi) =>{
        if(err){
            next(err)
        }else if (delovi.length > 0) {
            next(new Error('Ovaj proizvodjac ima delove'))
        }else{
            next()
        }
    })
})

module.exports = mongoose.model('Proizvodjac', proizvodjacSchema)
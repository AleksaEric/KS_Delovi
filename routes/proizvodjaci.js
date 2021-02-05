const express = require('express')
const router = express.Router()
const Proizvodjac = require('../models/proizvodjac')


//Ruta za sve proizvodjace
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const proizvodjaci = await Proizvodjac.find(searchOptions)
        res.render('proizvodjaci/index', {
            proizvodjaci: proizvodjaci, 
            searchOptions: req.query})
    } catch{
        res.redirect('/')
    }   
})


//Ruta za nove proizvodjace
router.get('/new', (req, res) =>{
    res.render('proizvodjaci/new', {proizvodjac: new Proizvodjac})
})

//Ruta za kreaciju proizvodjaca
router.post('/', async (req, res) =>{
    const proizvodjac = new Proizvodjac({
        name: req.body.name
    })
    try{
        const newProizvodjac = await proizvodjac.save()
        //res.redirect(`proizvodjaci/${newProizvodjac.id}`)
        res.redirect(`proizvodjaci`)
    } catch {
        res.render('proizvodjaci/new', {
                     proizvodjac: proizvodjac,
                     errorMessage: 'Greska pri kreiranju'
                 })

    }
    
    
})
module.exports = router 
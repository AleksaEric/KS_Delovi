const express = require('express')
const router = express.Router()
const Proizvodjac = require('../models/proizvodjac')
const Deo = require('../models/deo')


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
        res.redirect(`proizvodjaci/${newProizvodjac.id}`)
        res.redirect(`proizvodjaci`)
    } catch {
        res.render('proizvodjaci/new', {
                     proizvodjac: proizvodjac,
                     errorMessage: 'Greska pri kreiranju'
                 })

    }
    
    
})

router.get('/:id', async (req, res) =>{
    try{
        const proizvodjac = await Proizvodjac.findById(req.params.id)
        const delovi = await Deo.find({ proizvodjac: proizvodjac.id}).limit(6).exec()
        res.render('proizvodjaci/show',{
            proizvodjac: proizvodjac,
            deloviByProizvodjac: delovi 
        })
    }catch{
        res.redirect('/')
    }
    
})

router.get('/:id/edit', async (req, res) => {
    try{
        const proizvodjac = await Proizvodjac.findById(req.params.id)
        res.render('proizvodjaci/edit', {proizvodjac: proizvodjac})

    }catch{
        res.redirect('/proizvodjaci')
    }
    res.render('proizvodjaci/edit', {proizvodjac: new Proizvodjac})
})

router.put('/:id', async (req, res) =>{
    let proizvodjac
    try{
        proizvodjac = await Proizvodjac.findById(req.params.id)
        proizvodjac.name = req.body.name
        await proizvodjac.save()
        res.redirect(`/proizvodjaci/${proizvodjac.id}`)
        
    } catch {
        if(proizvodjac == null ){
            res.redirect('/')
        }else{
            res.render('proizvodjaci/edit', {
                proizvodjac: proizvodjac,
                errorMessage: 'Greska pri izmeni'
            })

        }
        

    }
})

router.delete('/:id', async (req, res) =>{
    
    let proizvodjac
    try{
        proizvodjac = await Proizvodjac.findById(req.params.id)
        await proizvodjac.remove()
        res.redirect('/proizvodjaci')
        
    } catch {
        if(proizvodjac == null ){
            res.redirect('/')
        }else{
            res.redirect(`/proizvodjaci/&{proizvodjac.id}`)
            }

        }
        

    }
)
module.exports = router 
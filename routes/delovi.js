const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Deo = require('../models/deo')
const Proizvodjac = require('../models/proizvodjac')
const { param } = require('./proizvodjaci')



//Ruta za sve delove
// router.get('/', async (req, res) =>{
//     let query = Deo.find()
//     if (req.query.naziv != null && req.query.naziv != ''){
//         query = query.regex('naziv', new RegExp(req.query.naziv, 'i'))
//     }
//     try{
//         const delovi = await query.exec()
//         res.render('delovi/index', {
//             delovi: delovi,
//             searchOptions: req.query
//         })

//     }catch{
//         res.redirect('/')
//     }
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if(req.query.naziv != null && req.query.naziv !== ''){
        searchOptions.naziv = new RegExp(req.query.naziv, 'i')
    }

    try{
        const delovi = await Deo.find(searchOptions)
        res.render('delovi/index', {
            delovi: delovi, 
            searchOptions: req.query})
    } catch{
        res.redirect('/')
    }  
})


//Ruta za nove delove
router.get('/new', async (req, res) =>{
    try{
        const proizvodjaci = await Proizvodjac.find({})
        const deo = new Deo()
        res.render('delovi/new', {
            proizvodjaci: proizvodjaci,
            deo: deo
        })
    }catch{
        res.redirect('/delovi')
    }
    
})

//Ruta za kreaciju delova
// router.post('/', async (req, res) =>{
//     const deo = new Deo ({
//         naziv: req.body.naziv,
//         stanje: req.body.stanje,
//         proizvodjac: req.body.proizvodjac
//     })

//     try{
//         const newDeo = await deo.save()
//         //res.redirect('delovi/${newDeo.id}')
//         res.redirect('delovi')

//     }catch{
//         renderNewPage(res, deo, true)

//     }
router.post('/', async (req, res) =>{
    const deo = new Deo({
        naziv: req.body.naziv,
        stanje: req.body.stanje,
        proizvodjac: req.body.proizvodjac
    })
    try{
        const newDeo = await deo.save()
        //res.redirect(`proizvodjaci/${newProizvodjac.id}`)
        res.redirect(`delovi`)
    } catch {
        res.render('delovi/new', {
                     deo: deo,
                     errorMessage: 'Greska pri kreiranju'
                 })

    }
    
    
})

router.get('/:id', async (req, res) =>{
    try{
        const deo = await Deo.findById(req.params.id)
        .populate('proizvodjac')
        .exec()
        res.render('delovi/show', {deo: deo})
    }catch{
        res.redirect('/')
    }
})

//Ruta za izmenu delova
router.get('/:id/edit', async (req, res) =>{
    try{
        const deo = await Deo.findById(req.params.id)
        renderEditPage(res, deo)
    }catch{
        res.redirect('/')
    }
    
    
})

async function renderEditPage(res, deo, hasError = false){
        try{
            const proizvodjaci = await Proizvodjac.find({})
            const params = {
                proizvodjaci: proizvodjaci,
                deo: deo
            }
            if (hasError) params.errorMessage = 'Greska pri kreiranju dela'
            res.render('delovi/edit', params)
        }catch{
            res.redirect('/delovi')
        }
    }


//  async function renderNewPage(res, deo, hasError = false){
//     try{
//         const proizvodjaci = await Proizvodjac.find({})
//         const params = {
//             proizvodjaci: proizvodjaci,
//             deo: deo
//         }
//         if (hasError) params.errorMessage = 'Greska pri kreiranju dela'
//         res.render('delovi/new', params)
//     }catch{
//         res.redirect('/delovi')
//     }
// }

module.exports = router 
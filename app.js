if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const proizvodjacRouter = require('./routes/proizvodjaci')
const deoRouter = require('./routes/delovi')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'leyouts/leyout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended:false}))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose!'))


app.use('/', indexRouter)
app.use('/proizvodjaci', proizvodjacRouter)
app.use('/delovi', deoRouter)

//PORT IZ OKRUZENJA ILI DEV
app.listen(process.env.PORT || 3000)






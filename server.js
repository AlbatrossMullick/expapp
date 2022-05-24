if(process.env.NODE_ENV != 'production'){
    // require('dotenv').parse()
    const path = require('path');
    require('dotenv').config({ path: path.resolve(__dirname, './.env') })
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index.js')



app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

const mongoose = require('mongoose')
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => {console.log(error)})
db.once('open',() => {console.log("Connected to mongoose")})




app.listen(process.env.PORT || 3000)
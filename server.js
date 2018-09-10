const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs') //set view engine to hbs

app.use((req,res,next)=> {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`  //custom logging to server.log
    console.log(log)

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error: Unable to append to server.log')
        }
    })
    next()
})

app.use((req,res,next) => {
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('Capitalize', (text) => {
    return text.toUpperCase()
})

app.get('/', (req,res) =>{
    // res.send('<h1>Hello World</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: ' Awyis!',
    })
})

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req,res) =>{
    res.send({
        errorMessage:'404 error'
    })
})

app.listen(port, ()=> {
    console.log(`Server up in port ${port}`)
})
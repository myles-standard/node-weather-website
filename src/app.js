// core modules
import path from 'path'
import { fileURLToPath } from 'url'
// npm modules
import express from 'express'
import hbs from 'hbs'

import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'

const app = express()
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup Handlebars and views engine location
// the string "view engine" must be typed exactly this way, else it will not work.
// hbs (npm module; handlebars; handlebar for dynamic html)
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory to server
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Myles Standard'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Myles Standard'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is a help message.',
        title: 'Help',
        name: 'Myles Standard'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {/*DEFAULT VALUE*/}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     weather: '40 degrees C',
    //     forecast: 'Sunny, with a 30% chance of rain.',
    //     location: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Myles Standard',
        errorMessage: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Myles Standard',
        errorMessage: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('SERVER RUNNING: Port ' + port)
})
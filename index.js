require('dotenv').config()

// Importing required modules
const express = require('express')
const database = require('./config/database.js')

const systemConfig = require('./config/system.js')

// Importing routes
const routeAdmin = require('./routes/admin/index.route.js')
const route = require('./routes/client/index.route.js')

database.connect();


const app = express()
const port = process.env.PORT;

// Setting up view engine
app.set('views', './views')
app.set('view engine', 'pug')

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;;

app.use(express.static('public'))

// Routes
routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
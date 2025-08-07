require('dotenv').config()

// Importing required modules
const express = require('express')

var methodOverride = require('method-override')

const bodyParser = require('body-parser')

var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')

const database = require('./config/database.js')

const systemConfig = require('./config/system.js')

// Importing routes
const routeAdmin = require('./routes/admin/index.route.js')
const route = require('./routes/client/index.route.js')

database.connect();


const app = express()
const port = process.env.PORT;

// Overriding methods for PUT and DELETE
app.use(methodOverride('_method'))

// Setting up view engine
app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Flash messages
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;;

app.use(express.static('public'))


// Routes
routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
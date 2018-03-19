const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const logger = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
import textRouter from './routes/api/text'

const app = express()

// add logger
app.use(logger("combined"))
// maybe useless cause of own CORS Header handler below
app.use(cors())
// let you get the body with 'req.body' in route handler
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// shady CORS
app.use((req, res, next) => {
    const origin = req.get('oigin')
    const host = req.get('host')
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*")
    //res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, x-access-token, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

// connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/text-db', (err, client) => {
    if (err) return console.log(err)
    const db = client.db('text-db')

    app.use((req, res, next) => {
        req.db = db
        next()
    })

    app.use('/api', textRouter)

    // later you can serve the client here
    app.use("/", express.static("client/public"))

    // start app
    app.listen(3001, () => {
        console.log("Server started")
    })
})


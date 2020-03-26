const cors = require('cors')
const express = require('express')
const db = require('./app/models')

const passport = require('passport')
const bodyParser = require('body-parser')
const http = require("http")
const socketIo = require("socket.io")

const strategy = require('./config/passport')
passport.use(strategy)

const app = express()

app.use(cors({origin: '*', credentials: true}))
app.use(passport.initialize())

app.use(express.static('public'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))


app.use((req, res, next) => {
    global.db = db
    next()
})

const server = http.createServer(app)
const io = socketIo(server)
io.on("connection", socket => {
  socket.on("disconnect", () => console.log("Client disconnected"))
})

require('./config/routes')(app, passport, io)

server.listen(8080, () => {
    console.log('app listening on port 8080!')
})
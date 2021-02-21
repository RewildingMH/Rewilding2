const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes')
const fileUpload = require('express-fileupload')
//const socketIO = require('socket.io')(server, { origins: '*:*'});


const app = express()
//Middlewares

//Me traduce las peticiones de json a objeto para poder cargarlos a la database
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use('/api', router)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname+'client/build/index.html'))
    } )
}

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => console.log("app on listening on port 4000"))

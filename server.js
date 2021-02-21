const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes')
const fileUpload = require('express-fileupload')

const app = express()
//Middlewares

//Me traduce las peticiones de json a objeto para poder cargarlos a la database
app.use(express.json())
app.use(cors({credentials: true, origin: true}))
app.use(fileUpload())
app.use('/api', router)

// const servidor =  http.createServer(app)

// const options = {
//     cors:true,
//     path: "/my-custom-path/"   
//    }

// const io = require('socket.io')(servidor, options)
// io.on('connection', socket => {
//     socket.on('conectado', () => {
//         options
//     })
// })

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    } )
}

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => console.log("Sirver on listening on port 4000"))

const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes')

const fileUpload = require('express-fileupload')

const app = express()
//Middlewares
//Me traduce las peticiones de json a objeto para poder cargarlos a la database

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/api', router)

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => console.log(`App listening on port ${process.env.PORT}`))
const express = require("express")
const router = require("./router")
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8000

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use((req, res, next) => {
    let origin = 'http://localhost:3000'
    res.header('Access-Control-Allow-Origin', origin)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.use(cors(corsOptions))

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
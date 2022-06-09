const express = require("express")
const router = require("./router")
require('dotenv').config()

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
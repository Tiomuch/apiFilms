import express from "express"
import "express-async-errors"
import router from "./router"

const PORT = process.env.PORT || 8000

const app = express()

app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
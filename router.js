const Router = require("express")
const userRouter = require("./user/router")
const filmsRouter = require("./films/router")

const router = new Router()

router.use('/user', userRouter)
router.use('/film', filmsRouter)

module.exports = router
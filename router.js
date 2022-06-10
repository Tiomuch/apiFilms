const Router = require("express")
const userRouter = require("./user/router")
const filmsRouter = require("./films/router")
const cashFeesRouter = require("./cashFees/router")
const auth = require("./middleware/auth")

const router = new Router()

router.use('/user', userRouter)
router.use('/film', auth, filmsRouter)
router.use('/cash-fees', auth, cashFeesRouter)

module.exports = router
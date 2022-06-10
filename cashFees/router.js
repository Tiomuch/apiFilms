const Router = require("express")
const router = new Router()
const cashFeesController = require("./controller")

router.get('/', cashFeesController.getCashFees)

module.exports = router
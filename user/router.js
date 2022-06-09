const Router = require("express")
const router = new Router()
const userController = require("./controller")

router.post('/register', userController.registerUser)
router.post('/auth', userController.authUser)
router.put('/restore-password', userController.restorePassword)

module.exports = router
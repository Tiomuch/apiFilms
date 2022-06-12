const Router = require("express")
const router = new Router()
const userController = require("./controller")
const auth = require("../middleware/auth")

router.post('/register', userController.registerUser)
router.post('/auth', userController.authUser)
router.put('/restore-password', userController.restorePassword)
router.get('/profile', auth, userController.getUser)

module.exports = router
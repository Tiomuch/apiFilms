const Router = require("express")
const router = new Router()
const filmsController = require("./controller")

router.post('/film', filmsController.createFilm)
router.get('/film', filmsController.getFilms)
router.put('/film', filmsController.updateFilm)
router.delete('/film/:id', filmsController.deleteFilm)

module.exports = router
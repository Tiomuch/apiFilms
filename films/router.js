const Router = require("express")
const router = new Router()
const filmsController = require("./controller")

router.post('/', filmsController.createFilm)
router.get('/', filmsController.getFilms)
router.put('/:id', filmsController.updateFilm)
router.delete('/:id', filmsController.deleteFilm)
router.get('/:id', filmsController.getFilmById)

module.exports = router
const db = require("../db")

class FilmsController {
    async createFilm(req, res) {
        const {title, description, image} = req.body

        const film = await db.query("SELECT * from films where title = $1", [title])
        if(!!film?.rows[0]) {
            res.status(400).json({
                message: 'Film already exist'
            })
            return
        }

        const newFilm = await db.query("INSERT INTO films (title, description, image) values ($1, $2, $3) returning *", [title, description, image])
        res.status(200).json(newFilm.rows[0])
    }
    async getFilms(req, res) {
        const {page = 1, limit = 10} = req.query

        const skip = +limit * (+page - 1);

        const films = await db.query("SELECT * from films limit $1 offset $2", [limit, skip])

        const total = await db.query("SELECT COUNT(*) from films")

        res.status(200).json({data: films.rows, total: +total.rows[0].count})
    }
    async updateFilm(req, res) {
        const {title, description, image} = req.body
        const id = req.params.id

        const film = await db.query("SELECT * from films where id = $1", [id])
        if(!film?.rows[0]) {
            res.status(400).json({
                message: 'Film is not exist'
            })
            return
        }

        const newFilm = await db.query("UPDATE films set title = $1, description = $2, image = $3 where id = $4 returning *", [title, description, image, id])
        res.status(200).json(newFilm?.rows[0])
    }
    async deleteFilm(req, res) {
        const id = req.params.id

        const film = await db.query("SELECT * from films where id = $1", [id])
        if(!film?.rows[0]) {
            res.status(400).json({
                message: 'Film is not exist'
            })
            return
        }

        await db.query("DELETE from films where id = $1", [id])
        res.status(200).json({
            message: 'Film successfully deleted'
        })
    }
}

module.exports = new FilmsController()
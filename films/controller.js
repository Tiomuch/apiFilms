const db = require("../db")

class FilmsController {
    async createFilm(req, res) {
        // TODO Проверять токен
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
        // TODO Проверять токен
        const {page, limit} = req.query

        if (!page || !limit) {
            res.status(400).json({
                message: 'Page or limit is undefined'
            })
            return
        }

        // TODO доделать

        res.status(200).json("ok")
    }
    async updateFilm(req, res) {
        // TODO Проверять токен
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
        // TODO Проверять токен
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
const db = require("../db")
const bcrypt = require('bcrypt')
require('dotenv').config()

class UserController {
    async registerUser(req, res) {
        const {name, password, secret_number} = req.body

        const user = await db.query("SELECT * from users where name = $1", [name])
        if(!!user?.rows[0]) {
            res.status(400).json({
                message: 'Name already used'
            })
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newSecretNumber = process.env.SECRET_NUMBER * secret_number - process.env.SECRET_NUMBER * process.env.SECRET_NUMBER

        const newPerson = await db.query("INSERT INTO users (name, password, secret_number) values ($1, $2, $3) returning *", [name, hashedPassword, newSecretNumber])
        res.status(200).json(newPerson.rows[0])
        // TODO отдать токен
    }
    async restorePassword(req, res) {
        const {name, password, secret_number} = req.body

        const user = await db.query("SELECT * from users where name = $1", [name])
        if(!user?.rows[0]) {
            res.status(400).json({
                message: 'User is not exist'
            })
            return
        }

        const currentSecretNumber = process.env.SECRET_NUMBER * secret_number - process.env.SECRET_NUMBER * process.env.SECRET_NUMBER
        if(currentSecretNumber !== user?.rows[0]?.secret_number) {
            res.status(400).json({
                message: 'Secret code is not correct'
            })
            return
        }

        const newUser = await db.query("UPDATE users set password = $1 where name = $2 returning *", [password, name])
        res.status(200).json({
            message: 'Password changed successfully'
        })
    }
    async authUser(req, res) {
        const {name, password} = req.body
        const user = await db.query("SELECT * from users where name = $1", [name])
        if(!user?.rows[0]) {
            res.status(400).json({
                message: 'User is not exist'
            })
            return
        }

        const passwordCorrect =  bcrypt.compareSync(password, user?.rows[0]?.password)
        if(!passwordCorrect) {
            res.status(400).json({
                message: 'Password is not correct'
            })
            return
        }

        res.status(200).json(user.rows[0])
        // TODO отдать токен
    }
}

module.exports = new UserController()
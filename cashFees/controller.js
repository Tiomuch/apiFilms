const db = require("../db")

class CashFeesController {
    async getCashFees(req, res) {
        const {page = 1, limit = 10} = req.query

        const skip = +limit * (+page - 1);

        const cashFees = await db.query("SELECT * from cash_fees limit $1 offset $2", [limit, skip])

        const total = await db.query("SELECT COUNT(*) from cash_fees")

        res.status(200).json({data: cashFees.rows, total: +total.rows[0].count})
    }
}

module.exports = new CashFeesController()
const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const boardDao = require('../dao/boardDao');

exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await boardDao.defaultDao();
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};
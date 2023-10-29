const mongoose = require('mongoose');

const server = process.env.DB_HOST;
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE; // TÊN CƠ SỞ DỮ LIỆU

class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(`mongodb://${server}:${port}/${database}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            })
    }
}

module.exports = new Database()

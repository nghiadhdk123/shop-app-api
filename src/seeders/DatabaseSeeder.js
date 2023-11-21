require('dotenv').config();
const database = require('../config/database');
const UserSeeder = require('./UserSeeder');

async function DatabaseSeeder()
{
    await UserSeeder;
}

module.exports = DatabaseSeeder;
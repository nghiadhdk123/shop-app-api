require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const database = require('./config/database');
const route = require('./routes');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

route(app);

app.listen(process.env.PORT_CONNECT, () => {
  console.log(`Example app listening on port ${process.env.PORT_CONNECT}`);
});
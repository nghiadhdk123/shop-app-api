require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require("http");
const cookieParser = require('cookie-parser');
const database = require('./config/database');
const route = require('./routes');
const socket = require('./socket');

const app = express();

app.use(cors({
  origin: '*',
}));

const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));



route(app);
socket(socketIo);

server.listen(process.env.PORT_CONNECT, () => {
  console.log(`Example app listening on port ${process.env.PORT_CONNECT}`);
});

const express = require('express');
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectToDatabase = require('./db/connection');
const createSocketIoConnection = require('./lib/socket.io');

// initialisign env file
const dotenv = require('dotenv');
dotenv.config();




//database connection
connectToDatabase();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//using router
app.use(router)


app.get("/", (req, res) => {
    res.send("hello ");
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {

    console.log(`server running at port : ${port}`);
})

createSocketIoConnection(server);

const express = require("express")
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const app = express()

// import dotenv
require("dotenv").config()

// middlewares
app.use('/public', express.static('public'));
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome to backend")
});

app.all("*", (req, res) => {
    res.status(400).render("error", { error: `The URI ${req.url} is not valid.` });
})

module.exports = app;
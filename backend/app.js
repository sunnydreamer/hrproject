const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const router = require("./routers")
const cors = require("cors");

const app = express();

// import dotenv
require("dotenv").config();

// middlewares
app.use("/public", express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // enable cookies for cors
  })
);
app.use(morgan(":method :url :status :response-time ms"));
app.use(cookieParser());
app.use(cors());


// use router
app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.all("*", (req, res) => {
  res.status(400).send(`The URI ${req.url} is not valid.`);
});

module.exports = app;

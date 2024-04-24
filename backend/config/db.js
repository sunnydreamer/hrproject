const mongoose = require("mongoose");
require("dotenv").config()
const { MONGO_URI } = process.env

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to mongo")
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

module.exports = mongoose.connection
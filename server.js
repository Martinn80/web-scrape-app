const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const colors = require("colors");
const connection = mongoose.connection;

const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://localhost/web-scrape-mongodb";

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

app.listen(PORT, () => {
    console.log("==================\n".rainbow);
    console.log(`App listening at http://localhost:${PORT}`.cyan);
});
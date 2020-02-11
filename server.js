const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const colors = require("colors");

const connection = mongoose.connection;

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/web-scrape-mongodb";
let db = mongoose.connection;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});



const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

const apiRoutes = require('./routes/api-routes');
app.use("/", apiRoutes);


app.listen(PORT, () => {
    console.log("==================\n".rainbow);
    console.log(`App listening at http://localhost:${PORT}`.cyan);
});
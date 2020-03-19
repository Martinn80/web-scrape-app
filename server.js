const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const connection = mongoose.connection;
const colors = require("colors");
const PORT = process.env.PORT || 8000;

const MONGODB_URI = 'mongodb+srv://admin:admin123@cluster0-qpbsx.mongodb.net/tech?retryWrites=true&w=majority' || "mongodb://localhost/web-scrape-mongodb";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connection.on('error', () => console.log('connection error'));

connection.once('open', () => {
    console.log('Connected to database');
    console.log('-------------------------------------------------------\n'.green);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use(logger("dev"));

const apiRoutes = require("./controller/api-routes");
app.use("/all", apiRoutes);

const htmlRoutes = require("./controller/html-routes");
app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log("========================================================\n".rainbow);
    console.log(`Listening on local: http://localhost:${PORT}`.cyan);
});
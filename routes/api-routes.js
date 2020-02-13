const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

router.get("/", (req, res) => {
    db.Article.find().then(Article => {
        res.json(Article);
    });
});

router.get("/findById/:id", (req, res) => {
    db.Article.find({
        _id: req.params.id
    }).then(result => {
        res.json(result);
    });
});

router.get("/findByTitle", (req, res) => {
    db.Article.find({
        title: req.body.title
    }).then(result => {
        res.json(result);
    });
});

router.get("/scrape", (req, res) => {
    axios.get("https://arstechnica.com/gaming/").then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);
        let newsObject = [];

        $("li.article").each((index, element) => {
            const title = $(element)
                .find("a.overlay")
                .attr("href");

            const summary = $(element)
                .find("a")
                .text()
                .split("    \n")[0];

            const url = $(element)
                .find("a")
                .attr("href")
                .split();

            db.Article.find({
                title: title
            }).then(result => {
                if (result.length > 0) {
                } else {
                    let newNews = {}
                    newNews.title = title.toString();
                    newNews.summary = summary.toString();
                    rootUrl = "https://arstechnica.com/" + url.toString();
                    newNews.url = rootUrl;
                    db.Article.create(newNews).then(result => {
                    }).catch((err) => res.json(err));
                }
            });

            console.log(title.blue);
            console.log(summary.green);
            console.log("====================\n");
        });
        res.send("connection success")
    });
})



module.exports = router;



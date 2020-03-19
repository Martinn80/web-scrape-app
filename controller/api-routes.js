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
        //console.log(urlResponse.data)
        let $ = cheerio.load(urlResponse.data);
        let objectArray = [];
        

        $("li.article").each((i, element) => {
            const title = $(element)
                .find("a.overlay")
                .attr("href")

            const summary = $(element)
                .find("a")
                .text()
                .split("    \n")[0];

            const url = $(element)
                .find("a")
                .attr("href")
                .split(" , ")[0];

            //console.log(title.blue);
            //console.log("    \n");
            // console.log(summary.green);
            //console.log(url);
            //console.log("=====================================================\n");
            let obj = {
                title: summary,
                summary: summary,
                url: url
            }
            
            // append / push obj to objectArray
            objectArray.push(obj)
            //console.log(objectArray);

        });
        //res.send("connection success")
        res.json({
            data: objectArray
        })
    });
})



module.exports = router;



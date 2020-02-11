const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/all", (req, res) => {
    console.log("route was hit");
    res.send('success')
});

axios.get("https://arstechnica.com/gaming/").then(urlResponse => {
    let $ = cheerio.load(urlResponse.data);
    $("li.article").each((i, element) => {
        const link = $(element)
            .find("a.overlay")
            .attr("href")

        const header = $(element)
            .find("a")
            .text()
            .split("     \n")[0];
        // console.log(element);

        console.log(link);
        console.log("============================\n".rainbow);
        console.log(header);
        console.log("============================\n".rainbow);
    });
});



module.exports = router;



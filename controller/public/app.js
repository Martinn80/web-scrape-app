const cheerio = require("cheerio");
const axios = require("axios");
const colors = require("colors");
const fs = require("fs");

axios.get("https://arstechnica.com/gaming/").then(urlResponse => {
    const $ = cheerio.load(urlResponse.data);

    $("li.article").each((i, element) => {
        const link = $(element)
            .find("a.overlay")
            .attr("href");

        const header = $(element)
            .find("a")
            .text()
            .split("    \n")[0];

        console.log(link.blue);
        console.log(header.green);
        console.log("====================\n");
    })
});

const articleLinks = document.getElementById("articleLinks");


articleLinks.append(link);

$("btn1").click(function () {
    $("#articleLinks").append(link);
});
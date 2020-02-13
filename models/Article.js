let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// require("mongose-type-url");

let ArticleSchema = new Schema({

    title: {
        type: String,
    },

    summary: {
        type: String
    },

    url: {
        type: mongoose.SchemaTypes.Url
    },

    comments: [{
        name: String,
        comment: String,
        default: []
    }],
});

// This creates our model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;
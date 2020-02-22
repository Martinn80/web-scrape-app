let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
let NoteSchema = new Schema({
    name: {
        type: String,
        default: "Anonymous"
    },
    Date: {
        type: String,
        default: Date.now()
    },
    comments: [{
        type: String,
        ref: "Article"
    }]
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
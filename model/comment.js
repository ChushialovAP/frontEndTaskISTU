const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bodyText: {
        type: String,
        required: true
    }
});

// export model user with UserSchema
module.exports = mongoose.model("comment", CommentSchema);
const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://ahtoh:123qweqwe@mongotest.f8gds.mongodb.net/MongoTest?retryWrites=true&w=majority";

const InitiateMongoServer = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
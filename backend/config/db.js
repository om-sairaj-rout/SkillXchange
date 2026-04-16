const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.error("DB connection error:", err.message);
    });
}

module.exports = connectToDB;
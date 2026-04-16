const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('databse is connected');
    }).catch(err => {
        console.error('DB connection error:', err);
    });
}

module.exports = connectToDB;
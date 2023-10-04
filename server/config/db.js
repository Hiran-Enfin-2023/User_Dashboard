const mongoose = require("mongoose");

const connectToDB=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Server successfully connected to DB");
    }).catch((err)=>{
        console.log(`something went wrong ${err}`);
    })
}

module.exports = connectToDB

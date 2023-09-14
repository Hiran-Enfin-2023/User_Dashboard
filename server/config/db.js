const mongoose = require("mongoose");

const connectToDB=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connected to Db");
    }).catch((err)=>{
        console.log(`something went wrong ${err}`);
    })
}

module.exports = connectToDB

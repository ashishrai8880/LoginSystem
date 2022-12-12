const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const mongooseURI = "mongodb://localhost/LoginSystem";

const connectToMongo = ()=>{
    mongoose.connect(mongooseURI , ()=>{
        
        console.log("Connected to Database succcesfully");
    })
}

module.exports = connectToMongo ;
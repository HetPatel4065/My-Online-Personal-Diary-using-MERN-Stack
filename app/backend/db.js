const mongoose= require('mongoose');
const mongoURI='mongodb://localhost:27017/mypersonaldiary';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfuly");
    }
    )
}

module.exports = connectToMongo;
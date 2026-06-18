const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
       await mongoose.connect("mongodb+srv://siddardhagorle05_db_user:162026@cluster0.lpzjwxh.mongodb.net/mydatabase?retryWrites=true&w=majority")
         console.log("db connected")

    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb;

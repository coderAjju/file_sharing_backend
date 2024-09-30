const mongoose = require('mongoose');

const connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connection successfully: ",conn.connection.host)
    }
    catch(error){
        console.error("Error connecting to MongoDB: ",error)
    }
}

module.exports = connectdb;
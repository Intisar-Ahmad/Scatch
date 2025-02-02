const { default: mongoose } = require("mongoose");
const connectDB = async () => {
   try {
    let connectionInstance = await mongoose.connect(`mongodb+srv://Bhino:${process.env.MONGO_DB_PASSWORD}@cluster0.a7voi.mongodb.net/Scatch`)
    console.log("DB successfully connected",connectionInstance.connection.host);
   } catch (error) {
        console.log("Error connecting to DB",error);
   }
}

module.exports = connectDB;
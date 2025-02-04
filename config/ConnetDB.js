const { default: mongoose } = require("mongoose");
const debug = require("debug")("Development:Mongoose");

const connectDB = async () => {
   try {
    await mongoose.connect(`mongodb+srv://Bhino:${process.env.MONGO_DB_PASSWORD}@cluster0.a7voi.mongodb.net/Scatch`)
    debug("DB successfully connected");
   } catch (error) {
        debug("Error connecting to DB",error);
   }
}

module.exports = connectDB;
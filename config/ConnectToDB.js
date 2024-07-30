const mongoose = require ("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection error",error);
        process.exit(1); //Exit the application if connection fails
        
    }
}
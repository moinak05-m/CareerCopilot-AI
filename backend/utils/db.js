const mongoose = require("mongoose");

// Force public DNS - fixes querySrv ECONNREFUSED
require("node:dns/promises").setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
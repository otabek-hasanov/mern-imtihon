const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require("mongoose")

async function db() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connected successfuly")
    } catch (error) {
        console.log("baza ulanmadi" + error.message)
        process.exit(1)
    }
}

module.exports = db;
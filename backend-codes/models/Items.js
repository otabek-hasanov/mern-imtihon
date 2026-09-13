const mongoose = require("mongoose")

const ItemsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    image: String,
    description: String,
    available: Boolean
})

module.exports = mongoose.model("Items", ItemsSchema)
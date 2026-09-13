require("dotenv").config();
const express = require("express")
const db = require("./config/db")
const cors = require("cors")

const app = express()
const CategoryRoutes = require("./routes/CategoryRoutes")
const ItemsRoutes = require("./routes/ItemsRoutes")
app.use(cors(), express.json())
db()
app.use("/", CategoryRoutes, ItemsRoutes)

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT} server runned`)
})
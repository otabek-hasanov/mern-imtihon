const express = require("express")
const { getItems, createItem, deleteItem } = require("../controllers/Items")
const router = express.Router()

router.get("/items{/:cid}", getItems)
router.post("/items/add", createItem)
router.delete("/items/:id", deleteItem)

module.exports = router;
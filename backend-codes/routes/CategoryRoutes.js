const express = require("express")
const { getCategories, createCategory, deleteCategory } = require("../controllers/Categories")
const router = express.Router()

router.get("/categories", getCategories)
router.post("/categories/add", createCategory)
router.delete("/categories/:id", deleteCategory)

module.exports = router

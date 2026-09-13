const Category = require("../models/Category")
const Items = require("../models/Items")

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ error: false, categories })
    } catch (error) {
        console.log(error.message)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Items.deleteMany({ category: req.params.id })

        await Category.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            error: false,
            message: "Kategoriya muvaffaiyatli o'chirildi"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

exports.createCategory = async (req, res) => {

    try {
        if (req.body && req.body.name && req.body.name.trim() !== "") {

            req.body.description = (!req.body.description || req.body.description.trim() === "") ? false : req.body.description;

            const data = await Category.create(req.body)
            return res.status(201).json({
                error: false,
                message: "Kategoriya muvaffaqiyatli yaratildi",
                data
            })
        } else {
            return res.status(400).json({ error: true, message: "Name parameteri bo'sh bo'lmasligi kerak" })
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}
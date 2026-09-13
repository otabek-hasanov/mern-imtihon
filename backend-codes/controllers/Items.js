const mongoose = require("mongoose");
const Category = require("../models/Category");
const Items = require("../models/Items")

async function IsExistCategory(c_id) {

    if (!mongoose.Types.ObjectId.isValid(c_id)) return false;
    
    const exist = await Category.exists({ _id: c_id })
    return exist ? true : false;
}

exports.deleteItem = async (req, res) => {
    try {
        await Items.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            error: false,
            message: "Items muvaffaiyatli o'chirildi"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}
exports.getItems = async (req, res) => {
    try {
        let items;

        if (req.params.cid) {
            items = await Items.find({ category: req.params.cid }).populate("category")
        } else {
            items = await Items.find().populate("category")
        }
        return res.status(200).json({ error: false, items })
    } catch (error) {
        res.status(400).json({ error: true, message: "Parameterlarni yozishda xatolik mavjud" })
    }
}

exports.createItem = async (req, res) => {
    try {
        if (req.body.name && req.body.name.trim() !== "") {
            if (typeof req.body.price == "number" && req.body.price >= 1) {
                if (await IsExistCategory(req.body.category) == true) {
                    if (typeof req.body.available == "boolean") {
                        req.body.image = req.body.image || false;
                        req.body.description = req.body.description || false;
                        const items_data = await Items.create(req.body)
                        if (items_data) {
                            return res.status(201).json({
                                error: false,
                                message: "Items muvaffaqaiyatli yaratildi",
                                items_data
                            })
                        } else {
                            return res.status(400).json({
                                error: true,
                                message: "Bazaga yozishda xatolik"
                            })
                        }
                    } else {
                        return res.status(400).json({
                            error: true,
                            message: "{available} parameteri faqat true yoki falase bo'lishi kerak"
                        })
                    }
                } else {
                    return res.status(400).json({
                        error: true,
                        message: "Siz kiritgan {category} id bilan kategoriya mavjud emas"
                    })
                }
            } else {
                return res.status(400).json({
                    error: true,
                    message: "{price} parameteri bo'sh bo'lmasligi va uning minimal miqdori 1$ yoki undan katta bo'lishi kerak"
                })
            }

        } else {
            return res.status(400).json({
                error: true,
                message: "{name} parameteri bo'sh bo'lmasligi kerak"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}
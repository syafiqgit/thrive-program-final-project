const express = require('express')
const { createProduct, getAllProducts, getMyProducts, deleteProduct, updateProduct } = require('../controllers/product.controller')

const productRouter = express.Router()

productRouter.get("/", getAllProducts)
productRouter.get("/myProducts", getMyProducts)
productRouter.post("/create", createProduct)
productRouter.patch("/update/:id", updateProduct)
productRouter.delete("/delete/:id", deleteProduct)

module.exports = productRouter
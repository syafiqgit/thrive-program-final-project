const express = require("express")
const { createProduct, getMyProduct, updateProduct, deleteProduct, getProducts } = require("../controllers.js/product.controller")
const { authorization } = require("../middlewares/authorization")

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.use(authorization)
productRouter.get("/myProduct", getMyProduct)
productRouter.post("/", createProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

module.exports = productRouter
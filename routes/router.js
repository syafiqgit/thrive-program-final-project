const express = require('express')
const authRouter = require('./auth.router')
const { authentication } = require('../middlewares/authentication')
const userRouter = require('./user.router')
const { authorization } = require('../middlewares/authorization')
const storeRouter = require('./store.router')
const productRouter = require('./product.router')
const transactionRouter = require('./transaction.router')

const router = express.Router()

router.use("/api/auth", authRouter)
router.use(authentication)
router.use("/api/user", userRouter)
router.use("/api/store", authorization, storeRouter)
router.use("/api/product", productRouter)
router.use("/api/transaction", transactionRouter)

module.exports = router
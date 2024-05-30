const express = require('express')
const authRouter = require('./auth.route')
const { authentication } = require('../middlewares/authentication')
const userRouter = require('./user.route')
const storeRouter = require('./store.route')
const authorization = require('../middlewares/authorization')
const productRouter = require('./product.route')

const router = express.Router()

router.use("/api/auth", authRouter)
router.use(authentication)
router.use("/api/user", userRouter)
router.use(authorization)
router.use("/api/store", storeRouter)
router.use("/api/product", productRouter)

module.exports = router
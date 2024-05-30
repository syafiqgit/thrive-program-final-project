const express = require('express')
const authRouter = require('./auth.route')
const { authentication } = require('../middlewares/authentication')
const userRouter = require('./user.route')

const router = express.Router()

router.use("/api/auth", authRouter)
router.use(authentication)
router.use("/api/user", userRouter)

module.exports = router
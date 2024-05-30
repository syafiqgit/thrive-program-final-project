const express = require('express')
const { getUser, updateUser, updateRoleToSeller, deleteUser } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.get("/", getUser)
userRouter.patch("/", updateUser)
userRouter.patch("/seller", updateRoleToSeller)
userRouter.delete("/", deleteUser)

module.exports = userRouter
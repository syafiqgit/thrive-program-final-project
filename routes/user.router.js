const express = require("express")
const { getUser, updateUser, deleteUser } = require("../controllers.js/user.controller")

const userRouter = express.Router()

userRouter.get("/", getUser)
userRouter.patch("/", updateUser)
userRouter.delete("/", deleteUser)


module.exports = userRouter
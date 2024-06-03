const express = require("express")
const { createStore, updateStore, deleteStore, getStore } = require("../controllers.js/store.controller")

const storeRouter = express.Router()

storeRouter.get("/", getStore)
storeRouter.post("/", createStore)
storeRouter.patch("/", updateStore)
storeRouter.delete("/", deleteStore)


module.exports = storeRouter
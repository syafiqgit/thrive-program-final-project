const express = require("express")
const { createTransaction, getTransaction } = require("../controllers.js/transaction.controller")

const transactionRouter = express.Router()

transactionRouter.get("/", getTransaction)
transactionRouter.post("/:id", createTransaction)

module.exports =  transactionRouter
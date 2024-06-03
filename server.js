const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./routes/router")
require("dotenv").config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

app.listen(port, () => console.log(`Server running on port ${port}`))
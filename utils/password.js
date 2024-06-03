const bcrypt = require("bcryptjs")
const hashingPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
    const isMatchPassword = await bcrypt.compare(password, hashedPassword)
    return isMatchPassword
}

module.exports = {
    hashingPassword,
    comparePassword
}
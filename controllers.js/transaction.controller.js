const { Product, Transaction, sequelize } = require("../models")
const statusMessage = require("../utils/statusMessage")

const createTransaction = async (req, res) => {
    const { id } = req.user;
    const productId = req.params.id;
    console.log(productId)
    const { quantity } = req.body;

    try {
        const product = await Product.findOne({ where: { id: productId } });
        if (product.stok > quantity) {
            const transactionData = {
                user_id: id,
                store_id: product.store_id,
                product_name: product.name,
                quantity: quantity,
                total_price: product.price * quantity,
            };
            await sequelize.transaction(async (transaction) => {
                await Transaction.create(transactionData, { transaction });
                await product.decrement('stok', { by: quantity, transaction });
            });
            statusMessage(res, 201, "Transaction success", transactionData);
        } else {
            statusMessage(res, 400, "Stock not enough");
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message);
        } else {
            statusMessage(res, 400, error.message);
        }
    }
};

const getTransaction = async (req, res) => {
    const { id } = req.user
    try {
        const transaction = await Transaction.findAll({ where: { user_id: id } })
        if (!transaction) statusMessage(res, 404, "Transaction not found")
        statusMessage(res, 200, "Get transaction success", transaction)
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

module.exports = {
    createTransaction,
    getTransaction
}
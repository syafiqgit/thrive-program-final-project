const { Product } = require('../models');
const { Order } = require('../models')
const { OrderItem } = require('../models')
const statusMessage = require('../utils/status.message')
const { sequelize } = require('../models/index');

const createOrderTransaction = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { id } = req.params
        if (!id) {
            throw new Error("Missing product id")
        }
        const product = await Product.findByPk(id, {
            include: [OrderItem]})
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        const order = await Order.create({
            total_price: 0,
        }, { transaction })
        let totalOrderPrice = 0
        const orderItems = await Promise.all(
            product.OrderItems.map(async item => {
                const orderItem = await OrderItem.create({
                    order_id: order.order_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }, { transaction })
                totalOrderPrice += orderItem.price
                return orderItem
            })
        )
        order.total_price = totalOrderPrice
        await order.save({ transaction })
        await transaction.commit()
        statusMessage(res, 201, "Create order success", order)
    } catch (error) {
        console.log(error)
        if (error instanceof Error && error.name === "SequelizeValidationError") {
            statusMessage(res, 400, "Create order failed", error)
        } else if (error instanceof Error && error.name === "TypeError") {
            statusMessage(res, 400, "Create order failed", error)
        } else if (error instanceof Error && error.name === "RangeError") {
            statusMessage(res, 400, "Create order failed", error)
        } else {
            await (await transaction).rollback()
            statusMessage(res, 500, "Internal Server Error")
        }
    }
}


module.exports = createOrderTransaction
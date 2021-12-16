const db = require("../models")
const Order = db.orders
const OrderDetail = db.carts
const op = db.Sequelize.op

// Create and save a new Order
exports.createOrder = async (req, res) => {

    // validate request
    // ...
    try{
        // create new order
        const newOrder = {
            total_price: req.body.total_price,
            status: req.body.status,
            created: req.body.created,
            pay_at: req.body.pay_at,
            declined_at: req.body.declined_at
        }

        const order = await Order.create(newOrder)

        menus = req.body.menus
        let orderDetailArray = []

        menus.forEach(menu => {
            orderDetailArray.push({
                "order_id":order.id,
                "menu_id": menu.id,
                "amount": menu.amount
            })
        })

        const orderDetail = await OrderDetail.bulkCreate(orderDetailArray)

        res.send({"message": "data successfully saved to database"})
    }catch(err) {
        res.send({"error_message": err})
    }
    


}

// Retrieve All order from database
exports.getAllOrders = (req, res) => {

}

// Find a single/specific order
exports.getSpecifiOrder = (req, res) => {

}

// Update an order by id in the request
exports.updateOrder = (req, res) => {

}

// Delete an order with specific id
exports.deleteOrder = (req, res) => {

}

// Delete all orders from database
exports.deleteAllOrders = (req, res) => {

}

// Find all incoming orders (status = 0)
exports.getAllIncoming = async (req, res) => {
    // let array = []
    // Order.findAll({ where: { status: 0 } })
    // .then(data => {
    //     data.forEach( cart_order => {
    //         OrderDetail.findAll({where: {order_id: cart_order.id}})
    //         .then(data => {
    //             array.push
    //             console.log("All users:", JSON.stringify(data, null, 2));
    //         })
    //     });
        
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving tutorials."
    //   });
    // });

    try {
        const incoming_order = await Order.findAll({ where: { status: 0 } })

        let incoming_order_id = []
        incoming_order.forEach(single_order => {
            console.log('1==========================')
            incoming_order_id.push(single_order.dataValues.id)
        })
        console.log(incoming_order_id)
        const cart_detail = await OrderDetail.findAll({ 
            where: {
            order_id: incoming_order_id // Same as using `id: { [Op.in]: [1,2,3] }`
        }})
        console.log('2==========================')
        res.send(cart_detail)
    } catch (error) {
        res.send({"error_message": error})
    }
}


// Find All unpayed orders
exports.getAllUnpayed = (req, res) => {

}

// find all payed orders
exports.getAllPayed = (req, res) => {

}
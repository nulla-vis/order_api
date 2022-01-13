const db = require("../models")
const OrderDetail = db.carts
const Order = db.orders
const { Op } = require("sequelize");


// update a cart order
exports.updateCart = (req, res) => {
    const id = req.params.id;

    OrderDetail.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            checkCartComplete(id)
            res.send({
              message: "Cart order was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update Cart order with id=${id}. Maybe Cart order was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Cart order with id=" + id
          });
        });
}

// get all cart where status is 2 = completed and 3 = cancelled
exports.gettAllFinished = (req, res) => {

  OrderDetail.findAll({
    where: {
      status : {
        [Op.gte] : 2
      }
    }
  }).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Order details."
    })
  })

}

// Delete an with specific id
exports.deleteCart = (req, res) => {
  const id = req.params.id

  OrderDetail.destroy({
    where: {id: id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Cart was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Cart with id=" + id
    });
  });
}

// check if the order has been completed
const checkCartComplete = async (cart_id) => {
  const cartDetail = await OrderDetail.findByPk(cart_id)
  order_id = cartDetail.order_id

  const allCartByOrderId = await OrderDetail.findAll({
    where: {
      order_id: order_id
    }
  })
  
  if(allCartByOrderId.every(item => item.status >= 2)) {
    updateOrderToComplete(order_id)
  }
}

// update order status to 1 (all)
const updateOrderToComplete = (order_id) => {

  Order.update({status: 1}, {
    where: { id: order_id }
  })
    .then(num => {
      if (num == 1) {
        console.log('Order was updated successfully.')
      } else {
        console.log(`Cannot update Cart order with id=${order_id}. Maybe Cart order was not found or req.body is empty!`)
        res.send({
          message: `Cannot update Order with id=${order_id}. Maybe Order was not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart order with id=" + order_id
      });
    });
  
}


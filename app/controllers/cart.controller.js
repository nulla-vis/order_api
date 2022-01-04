const db = require("../models")
const OrderDetail = db.carts
const op = db.Sequelize.op


// update a cart order
exports.updateCart = (req, res) => {
    const id = req.params.id;

    OrderDetail.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
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
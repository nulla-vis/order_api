module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      order_id: {
        type: Sequelize.INTEGER
      },
      menu_id: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      table_number: {
        type: Sequelize.INTEGER
      }
    });
  
    return Cart;
  };
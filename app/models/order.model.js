module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      total_price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      pay_at: {
        type: Sequelize.DATE
      },
      declined_at: {
        type: Sequelize.DATE
      }
    });
  
    return Order;
  };
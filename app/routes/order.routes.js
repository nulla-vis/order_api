const { Router } = require("express")

module.exports = app => {
    const orders = require("../controllers/order.controller.js")
    const cart_order = require("../controllers/cart.controller.js")
    let router = require('express').Router()

    // Create new order
    router.post("/create", orders.createOrder)

    // Retrieve all incoming orders
    router.get("/incoming", orders.getAllIncoming);

    // update an order status
    router.put("/:id", cart_order.updateCart)

    app.use('/api/orders', router)
}
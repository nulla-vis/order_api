const { Router } = require("express")
const { route } = require("express/lib/router")

module.exports = app => {
    const orders = require("../controllers/order.controller.js")
    const cart_order = require("../controllers/cart.controller.js")
    let router = require('express').Router()

    // Create new order
    router.post("/create", orders.createOrder)

    // Retrieve All Orders
    router.get("/allOrders", orders.getAllOrders)

    // Retrieve all incoming orders
    router.get("/incoming", orders.getAllIncoming);

    // update an order status
    router.put("/:id", cart_order.updateCart)

    // Retrieve all finished/cancelled order
    router.get("/all_finished", cart_order.gettAllFinished)

    // Delete a cart with specific id
    router.delete("/:id", cart_order.deleteCart)

    app.use('/api/orders', router)
}
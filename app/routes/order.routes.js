const { Router } = require("express")

module.exports = app => {
    const orders = require("../controllers/order.controller.js")
    let router = require('express').Router()

    // Create new order
    router.post("/create", orders.createOrder)

    app.use('/api/orders', router)
}
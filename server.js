const express = require("express")
const cors = require("cors")
const db = require("./app/models")

const app = express()
const corsOption = {
    origin: "http://localhost:8081"
}

db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(cors(corsOption))

// parse request of content-type - application/json
app.use(express.json())

// parse request of content-type - application/x-www-form-urlencode
app.use(express.urlencoded({extended: true}))

// simple route
app.get("/wkwk", (req, res) => {
    res.json({"message": "Aplikasi jalan! wkwkw!"})
})
app.get("/", (req, res) => {
    res.status(200).json({"message": "Application is running!"})
})

require("./app/routes/order.routes")(app)

// set port, listening for request
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
module.exports = {
    HOST: "database-1.cb8atdkqw5qe.us-east-2.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "qwerty54321",
    DB: "order_api",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
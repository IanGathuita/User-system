const config = {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    server: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    port: 1433,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options: {
        encrypt:false,
    }
}

module.exports = config;
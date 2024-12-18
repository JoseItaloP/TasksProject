require('dotenv').config()
const mysql = require("mysql2")

const conectar = async () =>{
    const connection =  mysql.createConnection(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3300/${process.env.MYSQL_DATABASE}`)

    console.log('connected to database')
    return connection
}




module.exports = conectar;
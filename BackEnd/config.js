require('dotenv').config()

const mysql = require("mysql2/promise")

const conectar = async () =>{
    // const urlRail = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3300/${process.env.MYSQL_DATABASE}`
    // const HostDatabaseURL = 'mysql://root:senha123@localhost:3306/db_biblioteca'
    const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`

    // const urlPublic = process.env.URL_CONNECTION


    const connection = await mysql.createConnection(urlDB)

    console.log('connected to database')
    return connection
}




module.exports = conectar;
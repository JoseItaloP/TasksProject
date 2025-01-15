require('dotenv').config()
const mysql = require("mysql2/promise")

const conectar = async () =>{
    // const urlRail = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3300/${process.env.MYSQL_DATABASE}`
    // const HostDatabaseURL = 'mysql://root:senha123@localhost:3306/db_biblioteca'

    const urlPublic = 'mysql://root:UVXvkseaocUlVBtywUVuwyixNAuXCQVE@junction.proxy.rlwy.net:17195/railway'


    const connection = await mysql.createConnection(urlPublic)

    console.log('connected to database')
    return connection
}




module.exports = conectar;
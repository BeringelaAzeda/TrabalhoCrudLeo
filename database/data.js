const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

async function closepool() {
    try{
        await Promise.all(pool.connects.map((conn) => conn.end()));
        await pool.end();
        console.log("Pool fechada com sucesso")
    } catch(error){
        console.error("Erro ao fechar a pool" + error)
    }
}

module.exports = {
    pool,
    closepool
}
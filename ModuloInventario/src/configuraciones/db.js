const sequelize = require('sequelize');
const db = new sequelize(
    'sifcon', //sifcon   //base
    'root',   //root      //user
    '1234', //Root0417        //contraseña
    {
        host: '127.0.0.1',  //localhost        //directorio
        dialect: 'mysql',   //motor sql
        port: "3306", //3306     //puerto que utiliza mysql
    }
);
module.exports = db;
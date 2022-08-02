const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Proveedor = db.define(
    'proveedores', //Nombre de la tabla debe ser plural
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: true
        },
        rtn: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING(250),
            allowNull: true
        },

    },
    {
        tableName: 'proveedores',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
    }

);
module.exports = Proveedor;
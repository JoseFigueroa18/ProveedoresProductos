const { validationResult } = require('express-validator');
const modeloProveedores = require('../modelos/modeloProveedores');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloProveedores.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch (error) {
        console.error(error);
        msj.errores = error;
        //msjRes(res, 500, msj);
    }

};

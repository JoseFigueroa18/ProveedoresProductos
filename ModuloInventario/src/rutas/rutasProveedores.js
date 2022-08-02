const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProveedores = require('../controladores/controladorProveedores');
const rutas = Router();
rutas.get('/listar', controladorProveedores.Listar);

module.exports=rutas;
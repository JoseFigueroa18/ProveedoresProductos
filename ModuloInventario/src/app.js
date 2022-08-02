const express = require('express');
const morgan = require('morgan');
const path  = require('path');
require('dotenv').config();//esto tiene que estar antes de iniciar el servidor (es el paquete para correo)
const app = express();
//app.set('port',3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("json spaces", 2);

app.use('/api/productos', require('./rutas/rutasProductos'));

app.use("/api/Autenticacion", require("./rutas/rutasAutenticacion"));
app.use("/api/usuarioz", require("./rutas/rutasUsuarios"));
app.use("/api/colaboradores", require("./rutas/rutasColaboradores"));

app.use('/api/Tipoproductos', require('./rutas/rutasTipoproductos'));
app.use('/api/impuestos', require('./rutas/rutasImpuestos'));
app.use('/api/promociones', require('./rutas/rutasPromociones'));
app.use('/api/productosproveedores', require('./rutas/rutasProductosProveedores'));
app.use('/api/InventarioFisico', require('./rutas/rutasInventarioFisico'));
app.use('/api/Inventario', require('./rutas/rutasInventario'));
app.use('/api/DetalleInventarios', require('./rutas/rutasDetalleInventarios'));
app.use('/api/productosproveedores', require('./rutas/rutasProductosProveedores'));
app.use('/api/proveedores', require('./rutas/rutasProveedores'));



//app.use('/api/', require('./rutas'));
//app.use('/inventario/productos', require('./rutas/rutasProductos'));
app.listen(3002,/*app.get('port'),*/ () => {
    console.log("Servidor iniciado en el puerto 3002" /*+ app.get('port')*/);
})
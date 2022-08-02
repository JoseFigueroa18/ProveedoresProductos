const { validationResult } = require('express-validator');
const ModeloColaborador = require('../modelos/modeloColaborador');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de colaboradores");
};
exports.listarColaboradores = async (req, res) => {
   const listaColaboradores = await ModeloColaborador.findAll();
   if(listaColaboradores.length==0){
    res.send("No existen datos");
   }
   else{
       res.json(listaColaboradores);
   }
};

exports.buscarcolaborador = async (req, res) => {
    const fil  = req.query.filtro;
    const lista = await ModeloColaborador.findAll({
        where:{
            idColaborador: fil
        }
    });
    if(lista.length==0){
     res.send("No existen datos");
    }
    else{
        res.json(lista);
    }
 };


exports.guardar = async (req, res) => {
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {nombre, apellido, direccion, correo, fechaNacimiento, sexo, telefono, estado, imagen} = req.body;
        if(!nombre || !apellido || !correo || !fechaNacimiento || !sexo || !telefono || !estado ){
            res.send("Debe enviar los datos completos");
        }
        else {
          
            await ModeloColaborador.create({
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                correo: correo,
                fechaNacimiento: fechaNacimiento,
                sexo: sexo,
                telefono: telefono,
                estado: estado,
                imagen: imagen
                
            }
            )
                .then((data) => {
                    console.log(data);
                    res.send("Registro almacenado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Hubo un error");
                });
        }
    }
 };

//Modificar 
exports.modificar = async(req, res)=>{
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { idColaborador } = req.query;
        const {nombre, apellido, direccion, correo, fechaNacimiento, sexo, telefono, estado, imagen} = req.body;
        if(!nombre || !apellido || !correo || !fechaNacimiento || !sexo || !telefono || !estado ){
            res.send("Debe enviar los datos completos")
        }else{
        var buscarColaborador = await ModeloColaborador.findOne({
            where:{
                idColaborador:idColaborador,
            }
        });
        if(!buscarColaborador){
            res.send("el id no existe");
        }else{
            buscarColaborador.nombre=nombre;
            buscarColaborador.apellido=apellido;
            buscarColaborador.direccion=direccion;
            buscarColaborador.correo=correo;
            buscarColaborador.fechaNacimiento=fechaNacimiento;
            buscarColaborador.sexo=sexo;
            buscarColaborador.telefono=telefono;
            buscarColaborador.estado=estado;
            buscarColaborador.imagen=imagen;
            await buscarColaborador.save()
                //data es una variable para capturar el resultado de algo
                .then((data)=>{
                    console.log(data);
                    res.send("Registro actualizado")
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al modificar los datos")
            });
        }  
        }
    }
};
 exports.modificarEstado = async (req, res) => {
    const { idColaborador } = req.query;
    const { estado } = req.body;
    if(!idColaborador || !estado ){
        res.send("Envie los datos completos");
    }
    else{
        var buscarColaborador = await ModeloColaborador.findOne({
            where:{
                idColaborador: idColaborador,
            }
        });
        if(!buscarColaborador){
            res.send("El id no existe");
        }
        else{
            buscarColaborador.estado=estado;
            await buscarColaborador.save()
            .then((data)=>{
                console.log(data);
                res.send("Registro actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar los datos");
            });
        }
    }
 };


 /*exports.modificarimagen = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { idColaborador } = req.query;
    const { imagen } = req.body;
    if (!idColaborador || !imagen ) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarcolaborador = await ModeloColaborador.findOne({
            where: {
                idColaborador: idColaborador,
            }
        });
        if (!buscarcolaborador) {
            res.send("El id no esta");
        }
        else {
            console.log(buscarcolaborador.nombre);
            buscarcolaborador.nombre = apellido;
            buscarcolaborador.activo = direccion;
            buscarcolaborador.imagen = correo;
            buscarcolaborador.nombre = fechaNacimiento;
            buscarcolaborador.activo = sexo;
            buscarcolaborador.nombre = telefono;
            buscarcolaborador.activo = estado;
            buscarcolaborador.imagen = imagen;
            await buscarcolaborador.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro almacenado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al actualizar los datos");
                })
        }
    }
    res.send("Registro actualizado");
};*/



 exports.eliminar = async (req, res) => {
    const { idColaborador } = req.query;
    if(!idColaborador){
        res.send("Envie el id del registro");
    }
    else{
        var buscarColaborador = await ModeloColaborador.findOne({
            where:{
                idColaborador:idColaborador,
            }
        });
        if(!buscarColaborador){
            res.send("el id no existe");
        }
        else{
            await ModeloColaborador.destroy({
                where:
                {
                    idColaborador: idColaborador,
                }
            })
            .then((data)=>{
                console.log(data);
                    res.send("Registro eliminado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar el registro");
            });
        }
    }
 };
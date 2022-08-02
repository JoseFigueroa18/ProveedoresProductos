const ModeloUsuario = require("../modelos/modeloUsuario");
const ModeloColaborador = require("../modelos/modeloColaborador");
const { validationResult } = require("express-validator"); //variable capturar errores
exports.Raiz = (req, res) => {
  res.send("Esto es el inicio de el modulo de usuario");
};

exports.listaUsuarios = async (req, res) => {
  //async para que la peticion se espere que responda el servidor
  const listaUsuarios = await ModeloUsuario.findAll();

  if (listaUsuarios.length == 0) {
    res.send("No existe datos");
  } else {
    res.json(listaUsuarios);
  }
};
exports.buscarUsuarios = async (req, res) => {
  const { filtro } = req.query;
  //async para que la peticion se espere que responda el servidor
  const listaUsuarios = await ModeloUsuario.findAll({
    where: {
      idUsuario: filtro,
    },
  });

  if (listaUsuarios.length == 0) {
    res.send("No existe datos");
  } else {
    res.json(listaUsuarios);
  }
};

exports.guardar = async (req, res) => {
  //async para que la peticion se espere que responda el servidor

  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    const { idColaboradores, usuario, contrasena } = req.body; //solo datos obligatorios

    if (!idColaboradores || !usuario || !contrasena) {
      res.send("Debe enviar los datos completos");
    } else {
      const buscarColaborador = await ModeloColaborador.findOne({
        where: {
          idColaborador: idColaboradores,
          estado: true,
        },
      });
      console.log(buscarColaborador);
      if (!buscarColaborador) {
        res.send("El id de la persona existe o esta inactivo");
      } else {
        await ModeloUsuario.create({
          idColaboradores: idColaboradores,
          usuario: usuario,
          contrasena: contrasena,
        })
          .then((data) => {
            console.log(data);
            res.send("Registro Alamacenado");
          })
          .catch((error) => {
            console.log(error);
            res.send("Error al guardar los datos");
          });
      }
    }
  }
};

exports.modificar = async (req, res) => {
  //async para que la peticion se espere que responda el servidor
  console.log(req.query);
  console.log(req.body);
  const { idUsuario } = req.query; //capture los valores
  const { contrasena } = req.body; //post oculta

  if (!idUsuario || !contrasena) {
    res.send("Envie los datos completos");
  } else {
    var buscarUsuario = await ModeloUsuario.findOne({
      //var porque queremos que cambie el valor
      // findOne buscar un id exista dentro la db
      where: {
        idUsuario: idUsuario,
        estado: "A",
      },
    });

    if (!buscarUsuario) {
      res.send("El id no existe o esta inactivo");
    } else {
      console.log(buscarUsuario.usuario);

      buscarUsuario.contrasena = contrasena;

      //modificar en la bd

      await buscarUsuario
        .save()
        .then((data) => {
          //ver los datos
          console.log(data); //ver dato

          res.send("Registro actualizado");
        })
        .catch((error) => {
          res.send("Error al actualizar");
        });
    }
  }
};

exports.modificarEstado = async (req, res) => {
  //async para que la peticion se espere que responda el servidor
  console.log(req.query);
  console.log(req.body);
  const { idUsuario } = req.query; //capture los valores
  const { estado } = req.body; //post oculta

  if (!idUsuario || !estado) {
    res.send("Envie los datos completos");
  } else {
    var buscarUsuario = await ModeloUsuario.findOne({
      //var porque queremos que cambie el valor
      // findOne buscar un id exista dentro la db
      where: {
        idUsuario: idUsuario,
      },
    });

    if (!buscarUsuario) {
      res.send("El id no existe");
    } else {
      console.log(buscarUsuario.usuario);

      buscarUsuario.estado = estado;

      //modificar en la bd

      await buscarUsuario
        .save()
        .then((data) => {
          //ver los datos
          console.log(data); //ver dato

          res.send("Registro actualizado");
        })
        .catch((error) => {
          res.send("Error al actualizar");
        });
    }
  }
};

exports.eliminar = async (req, res) => {
  //async para que la peticion se espere que responda el servidor
  console.log(req.query);
  console.log(req.body);
  const { ididUsuario } = req.query; //capture los valores

  if (!ididUsuario) {
    res.send("Envie el id del registro");
  } else {
    var buscarUsuario = await ModeloUsuario.findOne({
      //var porque queremos que cambie el valor
      // findOne buscar un id exista dentro la db
      where: {
        ididUsuario: ididUsuario,
      },
    });

    if (!buscarUsuario) {
      res.send("El id no existe");
    } else {
      await ModeloUsuario.destroy({
        //destroy elimina
        where: {
          ididUsuario: ididUsuario,
        },
      }) //indicar el where

        .then((data) => {
          //ver los datos
          console.log(data); //ver dato

          res.send("Registro eliminado");
        })
        .catch((error) => {
          console.log(data);
          res.send("Error al eliminar el registro");
        });
    }
  }
};

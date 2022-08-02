const enviarCorreo = require("../Configuraciones/correo");
const ModeloUsuario = require("../modelos/modeloUsuario");
const ModeloColaborador = require("../modelos/modeloColaborador");
const { validationResult } = require("express-validator"); //variable capturar errores
const passport = require("../Configuraciones/passport");
const msj = require("../componentes/mensaje");
const { token } = require("morgan");
exports.recuperarContrasena = async (req, res) => {
  const validacion = validationResult(req); //capturar errores

  if (!validacion.isEmpty()) {
    res.json(validacion.array());
  } else {
    const { correo } = req.body;
    var buscarColaborador = await ModeloColaborador.findOne({
      where: { correo },
    });

    const pin = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    console.log(pin);
    if (buscarColaborador) {
      const data = {
        correo: correo,
        pin: pin,
      };
      if (enviarCorreo.recuperarContrasena(data)) {
        res.send("Correo Enviado");

        var buscarUsuario = await ModeloUsuario.findOne({
          where: {
            idColaboradores: buscarColaborador.idColaborador,
          },
        });

        if (!buscarUsuario) {
          res.send("El id no existe o esta inactivo");
        } else {
          console.log(buscarUsuario.usuario);
    
          buscarUsuario.pin = data.pin;
    
          //modificar en la bd
    
          await buscarUsuario
            .save()
            .then((data) => {
              //ver los datos
            })
            .catch((error) => {
              res.send("Error al actualizar");
            });
        }
      } else {
        res.send("Error al enviar Correo ");
      }
    } else {
      res.send("El correo no exite");
    }
  }
};
exports.ValidarAuntenticar = passport.ValidarAuntenticar;
exports.InisioSesion = async (req, res) => {
  const validacion = validationResult(req); //capturar errores
  if (!validacion.isEmpty()) {
    msj("Los datos son invalidos", 200, validacion.array(), res);
  } else {
    const { usuario, contrasena } = req.body;
    const buscarUsuario = await ModeloUsuario.findOne({
      where: {
        usuario: usuario,
      },
    });
    if (!buscarUsuario) {
      msj("El usuario o contraseña son incorrectos", 200, [], res);
    } else {
      if (
        !buscarUsuario.VerificarContrasena(contrasena, buscarUsuario.contrasena) &&
        buscarUsuario.pin != contrasena
      ) {
        msj("El usuario o contraseña son incorrectos", 200, [], res);
      } else {
        const Token = passport.generarToken({
          idUsuario: buscarUsuario.idUsuario,
        });
        const data = {
          token: Token,
          data: buscarUsuario,
        };
        msj("Bienvenido", 200, data, res);
      }
    }
  }
};
exports.Error = (req, res) => {
  msj("Debe estar autenticado", 200, [], res);
};

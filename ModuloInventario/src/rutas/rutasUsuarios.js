const { Router } = require("express");
const controladorUsuarios = require("../controladores/controladorUsuarios");
const { body, query } = require("express-validator");
const controladorAunteticacion = require("../controladores/controladorAutenticacion");
const router = Router();
router.get("/", controladorUsuarios.Raiz);
router.get(
  "/listar",
  controladorAunteticacion.ValidarAuntenticar,
  controladorUsuarios.listaUsuarios
);
router.post(
  "/guardar",

  body("idColaboradores")
    .isInt()
    .withMessage("Debe enviar valores enteros para el id de la persona")
    .notEmpty()
    .withMessage("Ingrese el colaborador"),
  body("usuario")
    .isLength({ min: 3 })
    .withMessage("El nombre del usuario debe tener al menos 3 letras"),
  body("contrasena")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 o mas caracteres"),

  controladorUsuarios.guardar
);
router.put("/modificarContrasena", controladorUsuarios.modificar);
router.put("/modificarEstado", controladorUsuarios.modificarEstado);
router.delete("/eliminar", controladorUsuarios.eliminar);
router.get("/buscarUsuario", controladorUsuarios.buscarUsuarios);
module.exports = router;

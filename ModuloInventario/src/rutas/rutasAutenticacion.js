const { Router } = require("express");
const controladorAutenticacion = require("../controladores/controladorAutenticacion");
const { body, query } = require("express-validator"); //para la validacion
const router = Router();

router.post(
  "/recuperarContrasena",

  body("correo").isEmail().withMessage("Debe enviar un correo valido"),

  controladorAutenticacion.recuperarContrasena
);
router.post(
  "/inicioSesion",

  body("usuario").notEmpty().withMessage("Debe enviar un usuario valido"),
  body("contrasena")
    .isLength({ min: 4 })
    .withMessage("La contraseña debe tener al menos 6 o mas caracteres"),

  controladorAutenticacion.InisioSesion
);
router.get("/error", controladorAutenticacion.Error);

module.exports = router;

const { Router } = require("express");
const { body, query } = require("express-validator");
const controladorColaboradores = require("../controladores/controladorColaboradores");
const router = Router();
router.get("/listar", controladorColaboradores.listarColaboradores);
router.get("/buscar", controladorColaboradores.buscarcolaborador);
router.post(
  "/guardar",
  body("correo").isEmail().withMessage("Envie un correo valido"),
  body("telefono")
    .isLength({ min: 8, max: 8 })
    .withMessage("El telefono debe contener 8 digitos")
    .isNumeric("Deben ser numeros para el telefono"),
  body("estado")
    .isIn(["activo", "inactivo"])
    .withMessage("estado invalido debe ser: activo, inactivo")
    .isLowercase()
    .withMessage("Deben ir todas en minusculas"),
  body("sexo")
    .isIn(["femenino", "masculino"])
    .withMessage("sexo invalido debe ser: femenino, masculino")
    .isLowercase()
    .withMessage("Deben ir todas en minusculas"),

  controladorColaboradores.guardar
);
router.put(
  "/modificar",
  body("correo").isEmail().withMessage("Envie un correo valido"),
  body("telefono")
    .isLength({ min: 8, max: 8 })
    .withMessage("El telefono debe contener 8 digitos")
    .isNumeric("Deben ser numeros para el telefono"),
  body("estado")
    .isIn(["activo", "inactivo"])
    .withMessage("estado invalido debe ser: activo, inactivo")
    .isLowercase()
    .withMessage("Deben ir todas en minusculas"),
  body("sexo")
    .isIn(["femenino", "masculino"])
    .withMessage("sexo invalido debe ser: femenino, masculino")
    .isLowercase()
    .withMessage("Deben ir todas en minusculas"),

  controladorColaboradores.modificar
);
router.put(
  "/modificarestado",
  body("estado")
    .isIn(["activo", "inactivo"])
    .withMessage("estado invalido debe ser: activo, inactivo")
    .isLowercase()
    .withMessage("Deben ir todas en minusculas"),
  controladorColaboradores.modificarEstado
);
router.delete("/eliminar", controladorColaboradores.eliminar);
module.exports = router;

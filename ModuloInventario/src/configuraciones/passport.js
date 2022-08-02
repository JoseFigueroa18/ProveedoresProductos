const passport = require("passport");
const modeloUsuario = require("../modelos/modeloUsuario");
const estrategiaJWT = require("passport-jwt").Strategy;
const extraerJWT = require("passport-jwt").ExtractJwt;
const JWT = require("jsonwebtoken");
const moment = require("moment");
const duracion = moment.duration(50, "m").asSeconds();
const clave = "MiContraseñaSegura";
exports.generarToken = (data) => {
  return JWT.sign(data, clave, { expiresIn: duracion });
};
const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;
passport.use(
  new estrategiaJWT(opciones, async (payload, done) => {
    return await modeloUsuario
      .findOne({
        where: {
          idUsuario: payload.idUsuario,
        },
      })
      .then((data) => {
        return done(null, data.idUsuario);
      })
      .catch((error) => {
        return done(null, false);
      });
  })
);
exports.ValidarAuntenticar = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/api/autenticacion/error/",
});

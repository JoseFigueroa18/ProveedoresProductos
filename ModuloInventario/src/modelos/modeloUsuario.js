const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const bcrypt = require("bcrypt");
const Usuario = db.define(
  "usuario",
  {
    idUsuario: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuario: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    contrasena: {
      type: sequelize.STRING(200),
      allowNull: false,
    },
    idColaboradores: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("A", "I"),
      allowNull: true,
      defaultValue: "A",
    },
    tipo: {
      type: sequelize.ENUM("AD", "US"),
      allowNull: true,
      //defaultValue: "US",
    },
    pin: {
      type: sequelize.CHAR(4),
      allowNull: true,
      defaultValue: "0000",
    },
  },
  {
    tableName: "usuarioz",
    timestamps: false,
    hooks: {
      beforeCreate(usuario) {
        const hast = bcrypt.hashSync(usuario.contrasena, 10);
        usuario.contrasena = hast;
      },
      beforeUpdate(usuario) {
        const hast = bcrypt.hashSync(usuario.contrasena, 10);
        usuario.contrasena = hast;
      },
    },
  }
);
Usuario.prototype.VerificarContrasena = (con, com) => {
  return bcrypt.compareSync(con, com);
};
module.exports = Usuario;

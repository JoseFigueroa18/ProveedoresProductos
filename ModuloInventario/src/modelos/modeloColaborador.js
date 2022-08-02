const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Colaborador = db.define(
  "colaborador",
  {
    idColaborador: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    direccion: {
      type: sequelize.STRING(200),
      allowNull: true,
    },
    correo: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    fechaNacimiento: {
      type: sequelize.DATE,
      allowNull: false,
    },
    sexo: {
      type: sequelize.ENUM("femenino", "masculino"),
      allowNull: false,
    },
    telefono: {
      type: sequelize.STRING(8),
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("activo", "inactivo"),
      allowNull: true,
      defaultValue: "activo",
    },
    imagen: {
      type: sequelize.STRING(250),
      allowNull: true,
    },
  },
  {
    tableName: "colaboradores",
    timestamps: false,
  }
);
module.exports = Colaborador;

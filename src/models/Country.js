const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true, // Agregar la propiedad primaryKey: true a la columna 'id'
    },
    bandera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
    },
    subregión: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    población: {
      type: DataTypes.INTEGER,
    },
  });
};

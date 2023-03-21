const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('CountryActivity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /*     CountryId: {
      type: DataTypes.STRING(3),
      references: {
        model: 'Country',
        key: 'id',
      },
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Activity',
        key: 'id',
      },
    }, */
  });
};

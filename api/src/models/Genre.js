const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('genre', {    /* sin ID porque los generos de la API no tienen ID, y acá se hace por defecto */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
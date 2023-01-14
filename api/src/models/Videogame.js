const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,           //Me sirve para tener ID unico, especifico y no se puede repetir.
      defaultValue: DataTypes.UUIDV4, //Versión
      primaryKey: true,
                 //Será la clave primaria
      allowNull: false,               //Me permite elegir si puede estar vacío o no.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,  //Me sirve por si quiero hacer un llamado a lo que está en mi DB
      allowNull: false,
      defaultValue: true
    },
  });
};

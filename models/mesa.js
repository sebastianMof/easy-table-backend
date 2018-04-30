'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mesa = sequelize.define('Mesa', {
    numero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, //Para convertirlo en serial poner en true
        allowNull: false
     }
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        validate: { min: 2, max: 12 } //Mínimo y máximo de la capacidad de la mesa
    }
  });

  Mesa.associate = (models) => {
        Mesa.hasMany(Reserva) //Una mesa puede tener muchas reservas (Mientras se verifique el horario de la reserva)

    return Mesa;
};

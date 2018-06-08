'use strict';

module.exports = (sequelize, DataTypes) => {

  const mesa = sequelize.define('mesa', {
    numero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false, //Para convertirlo en serial poner en true
        allowNull: false
     },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        validate: { min: 2, max: 100 } //Mínimo y máximo de la capacidad de la mesa
    }
  });

  mesa.associate = (models) => {
        mesa.hasMany(models.reserva); //Una mesa puede tener muchas reservas (Verificando el horario de la reserva)
  }
  return mesa;
};
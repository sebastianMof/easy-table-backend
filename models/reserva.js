'use strict';

module.exports = (sequelize, DataTypes) => {
  const reserva = sequelize.define('reserva', {
    fecha_inicio_reserva: {
        type: DataTypes.DATE, //YYYY-DD-MM HH:MM:SS
        allowNull: false
    },
    fecha_fin_reserva: {
      type: DataTypes.DATE, //YYYY-DD-MM HH:MM:SS
      defaultValue: null
    },
    estado: { //Esto no debe ingresarse, solo puede ser cambiado si es necesario
      type: DataTypes.BOOLEAN, //TRUE = Mesa está efectivamente tomada
      defaultValue: true
   }

  });

  reserva.associate = (models) => {
        reserva.belongsTo(models.usuario); //Cada reserva se asocia a un usuario
        reserva.belongsTo(models.mesa); //Pero también a una mesa
    };
  return reserva;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
        allowNull: false
   }
  apellido: {
      type: DataTypes.STRING,
        allowNull: false
   }
   rut: {
      type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, //Único, irrepetible y primary key
   }
   email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true
     }
   tipo_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
   }
  });

  Usuario.associate = (models) => {
        Usuario.hasMany(Reserva) //Una reserva pertenece al usuario, puede tener más de una reserva si es de grado mesero
  return Usuario;
};
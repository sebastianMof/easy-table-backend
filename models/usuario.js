'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    rut: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true //Único, irrepetible y primary key
    },
    tipo_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['Admin', 'Cliente']
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    }   

  });

  usuario.associate = (models) => {
    usuario.hasMany(models.reserva); //Una reserva pertenece al usuario, puede tener más de una reserva si es de grado mesero
  }  
  return usuario;
  
};
/*'use strict';

module.exports = (sequelize, DataTypes) => {
    let classX = sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Creo indice único para code y section. Esta es la manera de definir índices únicos para dos columnas
        indexes: [{
            fields: ['code', 'section'],
            unique: true
        }]
    });
    classX.associate = (models) => {
        classX.belongsToMany(models.teacher, {
            through: 'TeacherClass',
            as: 'teachers',
            unique: true,
        });
        classX.belongsToMany(models.student, {
            through: 'StudentClass',
            as: 'students',
            unique: true
        });
    };
    return classX;
};*/

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

'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    api_Standart: { type: DataTypes.STRING },
    api_Statistics: { type: DataTypes.STRING },
    api_Advert: { type: DataTypes.STRING },
    dateAndTime: { type: DataTypes.DATE }
})

module.exports = User;

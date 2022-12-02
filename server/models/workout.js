const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

module.exports = {
    Workout : sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        exercises: DataTypes.ARRAY(DataTypes.TEXT),
    })
}
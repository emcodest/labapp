module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('medicine_master', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        code: {
            type: Sequelize.STRING(255),
            uniqueKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        group: {
            type: Sequelize.STRING
        } 

    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
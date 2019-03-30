module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('department', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        code: {
            type: Sequelize.STRING(255),
            uniqueKey: true,
        },
        name: {
            type: Sequelize.STRING(255) 
        }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
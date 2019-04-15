module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('settings', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        type: {
            type: Sequelize.STRING(32)
        },
        value: {
            type: Sequelize.TEXT("long")
        },


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
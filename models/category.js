module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('category', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        code: {
            type: Sequelize.STRING(255)
        }, 
        cat_name: { 
            type: Sequelize.STRING(255),
            uniqueKey: true
        },
        department_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }       


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
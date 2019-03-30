module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('test_category', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        test_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        category_id: {
            
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        test_order: {
            type: Sequelize.INTEGER
        }



    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
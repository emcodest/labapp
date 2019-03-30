module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('test_profile', {

        id: { 
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        profile_id: { 
            type: Sequelize.INTEGER
        }, 
        test_id: {
            type: Sequelize.INTEGER,
        },
        test_order: {
            type: Sequelize.INTEGER,
        }
        


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
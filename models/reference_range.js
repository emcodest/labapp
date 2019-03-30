module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('ref_ranges', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        test_id: {
            type: Sequelize.INTEGER
        }, 
        date_type: { 
            type: Sequelize.STRING(255)
        },
        date_value: {
            type: Sequelize.STRING
        },
        sex: {
            type: Sequelize.STRING
        },
        from: {
            type: Sequelize.STRING
        },
        to: {
            type: Sequelize.STRING
        }
               


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
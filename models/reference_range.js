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
        sex: {
            type: Sequelize.STRING
        }, 
        unit_1: {
            type: Sequelize.STRING
        },
        unit_2: {
            type: Sequelize.STRING
        },
        lower_limit_1: {
            type: Sequelize.STRING
        },
        lower_limit_2: {
            type: Sequelize.STRING
        },
        upper_limit_1: {
            type: Sequelize.STRING
        },
        upper_limit_2: {
            type: Sequelize.STRING
        },
        formula_1: {
            type: Sequelize.STRING
        },
        formula_2: {
            type: Sequelize.STRING
        },
        from_age: {
            type: Sequelize.STRING
        },
        to_age: {
            type: Sequelize.STRING
        }
        
               


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('test', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        test_code: {
            type: Sequelize.STRING(32),
            uniqueKey: true,
        },
        test_name: {
            type: Sequelize.STRING,
        },
        unit_1: {
            type: Sequelize.STRING,
        },
        unit_2: {
            type: Sequelize.STRING,
        },
        lower_limit_1: {
            type: Sequelize.STRING,
        },
        lower_limit_2: {
            type: Sequelize.STRING,
        },
        upper_limit_1: {
            type: Sequelize.STRING,
        },
        upper_limit_2: {
            type: Sequelize.STRING,
        },
        formula_1: {
            type: Sequelize.STRING,
        },
        formula_2: {
            type: Sequelize.STRING,
        },
        rate: {
            type: Sequelize.DOUBLE,
        },
        test_type: {
            type: Sequelize.INTEGER,
        },
        normal: {
            type: Sequelize.STRING(32)
        },
        abnormal: {
            type: Sequelize.STRING(32)
        },
        report_type: {
            type: Sequelize.STRING,
        },
        summary: {
            type: Sequelize.STRING,
        },
        summary_2: {
            type: Sequelize.STRING,
        },
        summary_3: {
            type: Sequelize.STRING,
        },
        summary_4: { 
            type: Sequelize.STRING,
        },
        tax_per: {
            type: Sequelize.STRING,
        },
        custom: {
            type: Sequelize.STRING,
        }



    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
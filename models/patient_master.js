module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('patient_master', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        code: {
            type: Sequelize.STRING(255),
            uniqueKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING 
        },
        sex: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        marital_status: {
            type: Sequelize.STRING
        },
        religion: {
            type: Sequelize.STRING
        },
        nationality: {
            type: Sequelize.STRING
        },
        state_origin: {
            type: Sequelize.STRING
        },
        discount: {
            type: Sequelize.STRING
        }

    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
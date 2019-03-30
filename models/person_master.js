module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('person_master', {

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
        phone_no: {
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
        state: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        primary_specialty: {
            type: Sequelize.STRING
        },
        sub_specialty: {
            type: Sequelize.STRING
        }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
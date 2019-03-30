module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('center_master', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        code: {
            type: Sequelize.STRING(255),
            uniqueKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        contact_person: {
            type: Sequelize.STRING
        }, 
        primary_specialty: {
            type: Sequelize.STRING
        },
        other_specialty: {
            type: Sequelize.STRING
        },
        mobile_no: {
            type: Sequelize.STRING
        },
        office_no: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        director_name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        lga: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        discount: {
            type: Sequelize.STRING
        },
        cut: {
            type: Sequelize.STRING
        }

    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
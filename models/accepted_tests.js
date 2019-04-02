module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('accepted_tests', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.STRING(255), 
        },
        lab_no: {
            type: Sequelize.STRING(255),
            uniqueKey: true
        },
        test_raw: {

            type: Sequelize.STRING
        },
        patient_id: {
            type: Sequelize.STRING
        },
        ref_center_id: {
            type: Sequelize.STRING
        },
        
        ref_person_id: {
            type: Sequelize.STRING
        },
        ref_guardian_id: {
            type: Sequelize.STRING
        },
        clinical_info: {
            type: Sequelize.STRING
        },
        amount_paid: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.STRING
        },
        concession: {
            type: Sequelize.STRING
        },
        home_collection: {
            type: Sequelize.STRING 
        },
        net_amount: {
            type: Sequelize.STRING
        },
        paid: {
            type: Sequelize.STRING
        },
        paid_type: {
            type: Sequelize.STRING
        },
        pay_channel: {
            type: Sequelize.STRING
        },
        pay_type: {
            type: Sequelize.STRING
        },
        receipt_number: {
            type: Sequelize.STRING
        },
        tax_amount: {
            type: Sequelize.STRING
        },
        test_amount: {
            type: Sequelize.STRING
        }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
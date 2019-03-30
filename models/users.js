module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('users', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        user_type: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true,
            uniqueKey: true
        },
        password: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

        fname: {
            type: Sequelize.STRING
        },          

         status: {
             type: Sequelize.ENUM('active', 'inactive'),
             defaultValue: 'active'
         }

   
    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
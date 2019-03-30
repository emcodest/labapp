module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('profile', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        code: {
            type: Sequelize.STRING,
            uniqueKey: true
        },
         name: { 
             type: Sequelize.STRING(32),
             uniqueKey: true
        }, 
        rate: { 
            type: Sequelize.STRING
       },
        summary: { 
            type: Sequelize.STRING
       },
        status: {
            type: Sequelize.STRING(32)
        }



    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}
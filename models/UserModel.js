var db = require('../config/dbConfig');
// console.log(db.seq);
var user = db.sequelize.define('newuser',{
    id:{
        type:db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
},
{
    //-----to set table name as given-----
    // freezeTableName: true,
    paranoid: true
    // tableName:'user_table_2' //----> to set table name

})
//----to stsop forcefully creating tables..----- 
// user.sync({force : false})
// .then(function(){

// })
// .catch(function(err){
//     console.log(err);
// })
user.sync({force : false})
.then(function(){

})
.catch(function(err){
    console.log(err);
})

module.exports = {db,user}
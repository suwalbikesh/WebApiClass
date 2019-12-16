var db = require('../config/dbConfig');

var img = db.sequelize.define('images',{
    id:{
        type:db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    image:{
        type: db.Sequelize.TEXT,
        allowNull: false
    }
},
{
    paranoid: true
})

img.sync({force : false})
.then(function(){

})
.catch(function(err){
    console.log(err)
})

module.exports = {db,img}
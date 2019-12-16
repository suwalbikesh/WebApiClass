var Sequelize = require('sequelize');

var sequelize = new Sequelize('softnpm','root','password',{
    host : 'localhost',
    dialect : 'mysql',
    logging : false
});

var seq = sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {Sequelize,sequelize,seq}
// module.exports = seq;

// var a =10;
// var promiseVal = new Promise(function(resolve,reject){

//     setTimeout(function(){
//         if(a === 10){
//             resolve('okay,success')
//         }
//         else{
//             reject('failure')
//         }
//     },3000)
// });

// console.log(promiseVal);
// promiseVal
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.log(err);
// })
// .finally(function(){

// })

"use strict"
// var http = require('http');
var test = require('express');
var bodyParser = require('body-parser');
// var userModel = require('./models/UserModel');
var userController = require('./controllers/UserController');
var imageController = require('./controllers/ImageController');
// console.log(userController);
// console.log(test);
var app1 = test();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');

var swaggerDefinition = {
    info: {
        title : 'webAPIAssignment',
        version : '0.0.1',
        description : 'this is webAPI assignment'
    },

    securityDefinitions:{
        bearerAuth: {
            type: 'apiKey',
            name:'authorization',
            scheme:'bearer',
            in: 'header'
        }
    },
    host : 'localhost:3023',
    basePath:'/'
}

var swaggerOptions = {
    swaggerDefinition,
    apis:['./index.js']
}

var swaggerSepcs = swaggerJSDoc(swaggerOptions);
app1.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSepcs));

app1.use(bodyParser.urlencoded({extended:true}));

//for registration
/**
* @swagger
* /registration:
*  post:
*   tags:
*    - User
*   description: Testing
*   produces:
*    - applicaiton/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      description: Enter Username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Enter password
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: Enter address
*   responses:
*    200:
*     description: registered successfully
*    409:
*     description: already registered
*    500:
*     description: internal server error
*/


//for delete user
/**
* @swagger
* /users/{id}:
*  delete:
*   tags:
*    - User
*   security:
*    - bearerAuth: []
*   description: This is for delete
*   produces:
*    - applicaiton/json
*   parameters:
*    - name: id
*      in: path
*   responses:
*    200:
*     description: deleted successfully
*    500:
*     description: internal server error
*/


//for login
/**
* @swagger
* /login:
*  post:
*   tags:
*    - User
*   description: This is for login
*   produces:
*    - applicaiton/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      description: Enter Username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Enter password
*   responses:
*    200:
*     description: login successfully
*    409:
*     description: user not found
*    500:
*     description: internal server error
*/

//for delete user
/**
* @swagger
* /users/{id}:
*  put:
*   tags:
*    - User
*   security:
*    - bearerAuth: []
*   description: This is for update
*   produces:
*    - applicaiton/json
*   parameters:
*    - name: id
*      in: path
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: Enter address
*   responses:
*    200:
*     description: updated successfully
*    404:
*     description: user not found
*    500:
*     description: internal server error
*/

//routes
app1.post('/login', userController.validator, userController.passwordCheck, userController.jwtTokenGen);

app1.post('/registration',userController.hashGen, userController.validation, userController.registerUser);
app1.delete('/users/:id',userController.tokenVerify,userController.deleteUsers);

app1.put('/users/:id',userController.tokenVerify,userController.userUpdate);

app1.post('/uploadimage',imageController.imageFile,imageController.uploadImage);

app1.use('/*',function(req,res){
    res.status(404);
    res.send('NOT FOUND');
});

// app1.post('/hotellist',function(req,res,next){
//     console.log(req.body);
//     res.status(200);
// })

// // function taskCallB(){
// //     //give response
// //     console.log('this is home page');
// // }

// function authMiddleware (req,res,next){
//     //middleware for authentication
//     console.log("middleware");
//     req.testvar = {name:'bikesh'}
//     next();
// }
// //call back function in / route
// app1.get('/hotellist/:id', authMiddleware,
// function(req,res){
//     // give response
//     console.log("this is home page"); //to show in console log
//     // res.send('this is home page'); // to show in screen.
//     res.set({
//         'Content-Type': 'application/json',
//         'asd':'123'
//     });
//     res.status(200);
//     // res.json({
//     //     'name':'annapurana',
//     //     'location':'pulchok',
//     //     'phone':'354658479451',
//     // });
//     console.log(req.testvar);
//     console.log(req.params);
//     console.log(req.query);
//     var a = req.params;
//     res.send(a);
// })
app1.use(function(err,req,res,next){

    res.json({
        status:err.status,
        message: err.message

    })
    // res.send(err.message)
})

app1.listen(3023);
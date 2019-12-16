var userModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
// console.log(userModel);
function hashGen(req,res,next){
    console.log(req.body.password)
    saltRound = 10;
    bcrypt.hash(req.body.password, saltRound)
    .then(function(hash){
        console.log(hash);
        req.userHash = hash;
        next();
    })
    .catch(function(err){
        next(err);
    })
}

function validation(req,res,next){
    // console.log(req.body);
    userModel.user.findOne({
    where:{username:req.body.username}
})
.then(function(result){
    console.log(result);
    if(result === null){
        res.send("user registered");
        next();
    }
    else{
        console.log("user was already registered")
        res.send("user was already registered");
    }
})
.catch(function(err){
    console.log(err);
})
}

function registerUser(req, res, next){
    // console.log(req.body);
    // console.log(req.userHash);
    userModel.user.create({
        username:req.body.username,
        password:req.userHash
    })
    .then(function(){
        
    })
    .catch(function(err){
        console.log(err);
    })

}
//for login and gernerating json web token
function validator(req, res, next){
    // console.log(userModel);
    if(req.body.username === null){
        next({status : 201,
            message : 'username is empty'
        })
    }
    else if(req.body.password === null){
        next({status : 201,
            message : 'password is empty'
        })
    }
    //registered or not
    userModel.user.findOne({
        where:{username:req.body.username}
    })
    .then(function (result){
        if(result === null){
            // res.send('you have not registered')
            next({status : 201,
                message : 'you have not registered'
            })
        }
        else {
            // console.log(result);
            req.passwordFromDB = result.dataValues.password

            next();
        }

    })
    .catch(function(err){
        next(err);
    })

}

function passwordCheck(req, res, next){
    bcrypt.compare(req.body.password, req.passwordFromDB)
    .then(function(result){
        if(result === true){
            next();
        }
        else{
            next({
                status : 201,
                message : 'invalid password'
            })
        }
    })
    .catch(function(err){
        next(err);
    })
}

function jwtTokenGen(req,res){
    // console.log(req.body.username);
    var payloadd = {
        username : req.body.username,
        userLevel : 'superadmin',
    }
    jwt.sign(payloadd,'bikesh',{expiresIn : "2h"},function(err,resultToken){
        console.log(err);
        console.log(resultToken);
        res.json({status:200,"usertoken":resultToken});
        
    });

    // console.log(jwt);
}

function tokenVerify(req,res,next){
    
    if(req.headers.authorization === null){
        next({
            status: 401,
            message : 'you are not authorized to this page' 
        })
    }
    console.log(req.headers.authorization);
    var token = req.headers.authorization.slice(7,req.headers.authorization.length)
    console.log(token);
    jwt.verify(token,'bikesh',function(err,result){
        if(err === null){
            next();
        }
        else{
            next(err);
        }
        console.log(err);
        console.log(result);
    });
    // next();
}

function deleteUsers(req,res,next){
    if(req.params.id === null || undefined){
        res.status(500);
        next({
            status : 500,
            message : 'ID is not provided'
        });
    }
    userModel.user.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(function(result){
        if(result === 0){
            console.log(result);
            res.status(404);
            next({
                status : 404,
                message : 'user not found'
            })
        }
        else{
            res.json({status:200,message:'user deleted'});
        }
    })
    .catch(function(err){
        next(err);
    })
}

function userUpdate(req,res,next){
    userModel.user.update({
        address:req.body.address
    },{
        where:{
            id:req.params.id
        }
    })
    .then(function(result){
        if(result[0] === 0){
            // console.log(result);
            next({
                status : 404,
                message : 'user not found'
            })
        }
        else{
            res.json({status:200,message:'user updated'});
        }
    })
    .catch(function(err){
        next(err);
    })
}


// userModel.user.create({
//     username:'bikesh',
//     password:'newpassword'
// })
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.log(err);
// })

module.exports = {
    registerUser,
    validation,
    hashGen,
    jwtTokenGen,
    validator,
    passwordCheck,
    tokenVerify,
    deleteUsers,
    userUpdate

    }


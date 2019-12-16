var imageModel = require('../models/ImageModel');
var multer=require ('multer');
// Multer storage options
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
var upload = multer({ storage: storage });

var imageFile = upload.single('image')

function uploadImage(req,res,next){
    // console.log(req.file.filename);
    imageModel.img.create({
        image: req.file.filename
    })    
    .then(function(){
        next({status : 200,
            message : 'Upload successfull'})

    })
    .catch(function(err){
        console.log(err);
        next(err);
    })
}

module.exports = {
    uploadImage,
    imageFile
}
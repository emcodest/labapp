var express = require('express');
var router = express.Router();
//const handler = require("../lib/handler")
//! - - - - - - - - - -- - - - - - -SERVER REQUESTS FROM CLIENT

//! - - - - - - - - - -- - - - - - -PATIENTS
router.post('/patient/:action', function(req, res, next) {
   // console.log(req.body)
   //console.log(req.params.action)
    const patient = require("../lib/Patient")
    var fxn = patient[req.params.action]
    if (typeof fxn !== "function") {
      res.send('Function not implemented on the server')
    }
    //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
    fxn.apply(null, [req, res])


    //const action = req.params.action
    // handler.CallAction(req, res, "Patient", action)

});

//! - - - - - - - - - -- - - - - - -DEPARTMENT
  router.post('/department/:action', function(req, res, next) {
    
    const department = require("../lib/Department")
    var fxn = department[req.params.action]
    if (typeof fxn !== "function") {
      res.send('Function not implemented on the server')
    }
    //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
    fxn.apply(null, [req, res])   
  
  });

//! - - - - - - - - - -- - - - - - -TESTS
router.post('/test/:action', function(req, res, next) {

    const dyncall = require("../lib/ProcessTest")
    var fxn = dyncall[req.params.action]
    if (typeof fxn !== "function") {
      res.send('Function not implemented on the server')
    }
    //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
    fxn.apply(null, [req, res])  
  
  });
  
  //! - - - - - - - - - -- - - - - - -MEDICINE

  router.post('/master/:action', function(req, res, next) {
    //console.log("here")
    const dyncall = require("../lib/Masters")
    var fxn = dyncall[req.params.action]
    if (typeof fxn !== "function") {
      res.send('Function not implemented on the server')
    }
    //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
    fxn.apply(null, [req, res])   
  
  });
  
  //! - - - - - - - - - -- - - - - - -INVENTORY
  router.post('/inventory', function(req, res, next) {

   
  
  });
//! - - - - - - - - - -- - - - - - -SETTINGS
router.post('/patient', function(req, res, next) {

    res.render('client/logon', { title: 'Express' });
  
  });

  //! - - - - - - - - - -- - - - - - -UPLOAD FILE
  var multer = require('multer')
  // SET STORAGE
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      //console.log(file)
      var ext = file.originalname.split(".").pop()
      cb(null, file.fieldname + '-user1'+'.'+ext)
      
    }
  })
  
  var upload = multer({
    storage: storage
  })
router.post('/upload-file', upload.array('myfile', 12),  function(req, res) {

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  req.files.map(row => {

    console.log(row)
    var size = row.size / (1024*1024) // divide by 1kb
    console.log(size)
    // if bigger than 2mb
    if(size > 2){
      var fs = require('fs');
      var filePath = row.path;
      fs.unlinkSync(filePath);
    }
    

  })
  // upload(req, res, function (err) {
  //   console.log("my_path", req.files)
  
  //   if (err instanceof multer.MulterError) {
  //     // A Multer error occurred when uploading.
  //     console.log("Error occured", err)
  //   } else if (err) {
  //     // An unknown error occurred when uploading.
  //     console.log("Unknown error")
  //   }

  //   // Everything went fine.
    

  // })
  res.send("Bingo")
  

});


//! - - - - - - - - - -- - - - - - -

module.exports = router;

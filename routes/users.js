var express = require('express');
var router = express.Router();
var helper = require("../lib/handler")
var passport = require("passport")

router.get('/',  async function(req, res, next) {
//router.get('/', helper.authenticated, async function(req, res, next) {


  res.render('client/dashboard', { title: ''});

});

router.post('/',  async function(req, res, next) {

  helper.Login()
  passport.authenticate('local-signin', function(err, user, info) {
    if (err) { 
        helper.Error(res, "Bad Login!")
        return next(err);
     }
    if (!user) {
         return helper.Error(res, "Invalid username or password")
         //return res.redirect('/login');
         //return res.redirect('/login');
       // return next(err)
         }
    req.logIn(user, function(err) {

      if (err) { 
           return helper.Error(res, "Invalid username or password")
           //return res.redirect('/login');

           //return next(err); 
        
        }
      return helper.Success(res, "Welcome to Biosystems!", req.user) 
      //return next()
    //   return res.redirect('/users/' + user.username);


    });
  })(req, res, next);


});
router.get('/logout', function (req, res, next) {
  req.logout()

  res.redirect("/") // login

})

module.exports = router;

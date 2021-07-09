const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');


// *****************************
// ******* User Routes *******
// *****************************

router.route('/register')
  // Render Form
  .get(users.renderRegister)
  //POST FORM
  .post(catchAsync(users.register));

router.route('/login')
  //RENDER LOGIN FORM
  .get(users.renderLogin)
  // POST LOGIN
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login);


//LOGOUT
router.get('/logout', users.logout);
  
  

module.exports = router;
const express = require('express');
const router = express.Router();

const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const { storage } = require('../cloudinary');
const upload = multer({ storage });



const Campground = require('../models/campground');

const campgrounds = require('../controllers/campground');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


// ****************************
// **** Campground Routes ****
// ****************************


router.route('/')
  // Campgrounds index (lists all the campgrounds)
  .get(catchAsync(campgrounds.index))
  // POST NEW Campground
  .post(isLoggedIn, upload.array('campground[image]'), validateCampground, catchAsync(campgrounds.createCampground));


//GET NEW Campground FORM --> needs to be before /:id
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
  // campgrounds show (details page for a campground)
  .get(catchAsync(campgrounds.showCampground))
  // UPDATE Campground
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  //DELETE Campground ROUTE
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// GET edit campground FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
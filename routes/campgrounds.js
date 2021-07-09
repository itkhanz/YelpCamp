const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');

const campgrounds = require('../controllers/campground');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


// ****************************
// **** Campground Routes ****
// ****************************

// Campgrounds index (lists all the campgrounds)
router.get('/', catchAsync(campgrounds.index));

//GET NEW Campground FORM
router.get('/new', isLoggedIn, campgrounds.renderNewForm);
//POST NEW Campground
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// campgrounds show (details page for a campground)
router.get('/:id', catchAsync(campgrounds.showCampground));

// update/edit campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//DELETE Campground ROUTE
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { campgroundSchema } = require('../schemas.js');


//Joi Campground MIDDLEWARE
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error){
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
    } else {
      next();
    }
};


// *****************************
// ***** Campground Routes *****
// ****************************

// Campgrounds index (lists all the campgrounds)
router.get('/', catchAsync(async (req, res) => {
    //returns an array of campground objects with title and location
    const campgrounds = await Campground.find({});  
    // res.send(campgrounds);
    res.render('campgrounds/index', { campgrounds });
}));

// New Form route
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});
//POST ROUTE
router.post('/', validateCampground, catchAsync(async (req, res, next) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
}));

// campgrounds show (details page for a campground)
router.get('/:id', catchAsync(async(req, res) => {
  const campground = await Campground.findById(req.params.id).populate('reviews');
  res.render('campgrounds/show', { campground });
}));

// update/edit campground
router.get('/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));
router.put('/:id', validateCampground, catchAsync(async (req, res)=> {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

//DELETE Campground ROUTE
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

module.exports = router;
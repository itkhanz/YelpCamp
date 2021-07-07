const express = require('express');
const router = express.Router({ mergeParams: true });

const Campground = require('../models/campground');
const Review = require('../models/review');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

// *****************************
// ******* Review Routes *******
// *****************************

//POST REVIEW TO CAMPGROUND ROUTE
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    //After we make review we set:
     review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Added new review!');
    res.redirect(`/campgrounds/${campground._id}`);
  }));
  
  //DELETE REVIEW
  router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    //DESTRUCTURE FROM REQ.PARAMS
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
  }));

  module.exports = router;
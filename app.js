const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,  
  useFindAndModify: false   ////DeprecationWarning: Mongoose: `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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
//Joi Review MIDDLEWARE
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
};



app.get('/', (req, res) => {
    res.render('home');
});

// *****************************
// ***** Campground Routes *****
// ****************************

// Campgrounds index (lists all the campgrounds)
app.get('/campgrounds', catchAsync(async (req, res) => {
    //returns an array of campground objects with title and location
    const campgrounds = await Campground.find({});  
    // res.send(campgrounds);
    res.render('campgrounds/index', { campgrounds });
}));

// New Form route
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});
//POST ROUTE
app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
}));

// campgrounds show (details page for a campground)
app.get('/campgrounds/:id', catchAsync(async(req, res) => {
  const campground = await Campground.findById(req.params.id).populate('reviews');
  res.render('campgrounds/show', { campground });
}));

// update/edit campground
app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res)=> {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

//DELETE Campground ROUTE
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

// *****************************
// ******* Review Routes *******
// *****************************

//POST REVIEW TO CAMPGROUND ROUTE
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
}));

//DELETE REVIEW
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
}));





//BASIC ERROR HANDLERS
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something went Wrong';
  res.status(statusCode).render(`error`, { err });
});
  
app.listen(3000, () => {
    console.log('Serving on Port 3000')
})






// // MongoDB command to remove campground reviews created initially without validation
// db.campgrounds.update(
//   { _id : ObjectId("60c87724efcb2934f08046e8") }, 
//   { $pull: { 'reviews': ObjectId("60d3157498d31253a88b417b") } }
// );
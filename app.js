const express = require('express');
const mongoose = require('mongoose');

const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');

const ExpressError = require('./utils/ExpressError');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

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

//PUBLIC MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
// Mongoose Middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Campgrounds Middlware
app.use('/campgrounds', campgrounds);
// Reviews Middlware
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home');
});


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
if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

const express = require('express');

const mongoose = require('mongoose');

const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


const ExpressError = require('./utils/ExpressError');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

//mongo sanitize
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');


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
// MONGO SANITIZE Middleware
app.use(mongoSanitize({
  replaceWith: '_'
}));

// Session Middleware
const sessionConfig = {
  name: 'session',  //defaut name for the cookie is connect.sid
  secret: 'thisshouldbeabettersecret!',
  resave: 'false',
  saveUninitialized: 'true',
  cookie: {
    // Basic Security
    httpOnly: true,
    // secure: true,
    //have cookie expire after week
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));

// Flash middleware
app.use(flash());


// Helmet Middleware
app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/itkhan/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);



// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // use static authenticate method of model in LocalStrategy
passport.serializeUser(User.serializeUser());  //start session
passport.deserializeUser(User.deserializeUser()); //Take out of session


// Every route has access to flash object
app.use((req, res, next) => {
  //if you are not coming from these two routes..., if req.originalUrl does not include one of these then..
  //otherwise it will redirect back to login page if we click again login
  // redirecting to home page also is not sensible so we redirect to campgrounds
  if(!['/login', '/'].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl ;
  }
  // console.log(req.query);
  res.locals.currentUser = req.user; 
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// New User Registration
app.get('/fakeUser', async(req, res) => {
  const user = new User({email: 'itkhanz@gmail.com', username: 'itkhan'});
  const newUser = await User.register(user, 'hello');
  res.send(newUser);
});

// User Route Middleware
app.use('/', userRoutes)
// Campgrounds Route Middlware
app.use('/campgrounds', campgroundRoutes);
// Reviews Route Middlware
app.use('/campgrounds/:id/reviews', reviewRoutes);


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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

//NEW IMAGE SCHEMA
const ImageSchema = new Schema({
    url: String,
    filename: String
});
//use virtual because we do not need to store this information. We still need to request image url from database -- no need to store two
//every time we call thumbnail we are going to do this little calculation --> very lightweight
// https://mongoosejs.com/docs/tutorials/virtuals.html
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});
// c_crop Extracts the specified size from the original image without distorting or scaling the delivered asset.
ImageSchema.virtual('cardImage').get(function() {   
    return this.url.replace('/upload', '/upload/ar_4:3,c_crop'); 
});



//INCLUDE VIRTUALS
// By default, Mongoose does not include virtuals when you convert a document to JSON.
const opts = { toJSON: { virtuals: true } };

//CREATE SCHEMA
const CampgroundSchema = new Schema ({
    title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts);

//FOR MAPBOX POPUP --> NESTED
CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`;
});
  

//DELETE MIDDLEWARE
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    // the deleted element is passed in as 'doc'
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});


module.exports = mongoose.model('Campground', CampgroundSchema);

  
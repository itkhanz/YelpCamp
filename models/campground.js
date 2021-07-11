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
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
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

  
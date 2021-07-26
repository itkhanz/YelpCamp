const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });



module.exports.index = async (req, res, next) => {
    //returns an array of campground objects with title and location
    const campgrounds = await Campground.find({});  
    res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm =  (req, res) => {
    res.render('campgrounds/new');
};

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
      query: req.body.campground.location,
      limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));  // req.files object comes from  multer middleware
    campground.author = req.user._id;
    campground.geometry = (geoData.body.features[0].geometry);
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new Campground!');
    res.redirect(`campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({
      path: 'reviews',    //populate review
      populate: {
        path: 'author'    //populate review author
      }
    }).populate('author');
    if(!campground){
      req.flash('error', 'Cannot find that campground');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async(req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash('error', 'Cannot find that campground!');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
};

module.exports.updateCampground = async (req, res, next)=> {
    const { id } = req.params;
    const campground= await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    //spread array into push --> take data from array and pass into push
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages) {
      // deleting from Cloudinary
      for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename);
      };
      //COMPLICATED QUERY --> want to pull images where filename is in the req.body.deleteImages
      await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages }}}});
    };
    req.flash('success', 'Successfully updated a new Campground!');
    res.redirect(`${campground._id}`);
};

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
};
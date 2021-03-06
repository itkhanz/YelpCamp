if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//GRAB RANDOM ELEMENT FROM AN ARRAY
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    //CREATE LOOP FOR DATA - 50 times - 50 cities
    for(let i = 0; i < 300; i++){
        //random number for price
        const price = Math.floor(Math.random() * 20) + 10;
        //random number to pick city[from 1000 city array]
        const random1000 = Math.floor(Math.random() * 1000);
        //make new Campground - location: city, state
        const camp = new Campground({
            // SAM User ID
            author: '60f3d9a6a5d2894404da11f4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, eius perspiciatis cumque earum voluptatibus beatae. Cumque aperiam a nobis eum doloribus officia itaque commodi perferendis voluptates quae, dolorum ex deserunt.',
            price,  //shorthand do not need price: price 
            // Hard coded coordinates
            geometry : { 
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/itkhan/image/upload/v1626012665/YelpCamp/iacitl7efgz29bvxkxi6.png',
                    filename: 'YelpCamp/iacitl7efgz29bvxkxi6'              
                },
                {
                    url: 'https://res.cloudinary.com/itkhan/image/upload/v1626012664/YelpCamp/khogn5l2pdup716opxak.jpg',
                    filename: 'YelpCamp/khogn5l2pdup716opxak'              
                }
              ]
        });
        await camp.save()
    }
};

//seedDB returns a promise because it is an async function .then--> close connection
seedDB().then(() => {
    mongoose.connection.close();
});
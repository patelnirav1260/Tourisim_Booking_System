const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PlaceSchema = new Schema({

    place_name: String,
    description: String,
    price: Number,
    image: String
});

const PlaceModel = mongoose.model('Place',PlaceSchema);

module.exports = PlaceModel;
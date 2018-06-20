const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
We declare our PaintingSchema by calling the mongoose schema constructor and passing in the options. Notice how it’s strongly typed, for example the name field can consist of a string, techniques consists of array of strings.
*/

const PaintingSchema = new Schema({
    name: String,
    url: String,
    technique: String
});
/* We export the model and name it Painting */
module.exports = mongoose.model('Painting', PaintingSchema);
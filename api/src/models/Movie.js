const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    Source: { type: String, required: true },
    Value: { type: String, required: true },
});

const omdbDataSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Rated: { type: String, required: true },
    Released: { type: String, required: true },
    Runtime: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    Writer: { type: String, required: true },
    Actors: { type: String, required: true },
    Plot: { type: String, required: true },
    Language: { type: String, required: true },
    Country: { type: String, required: true },
    Awards: { type: String, required: true },
    Poster: { type: String, required: true },
    Ratings: { type: [ratingSchema], default: [] },
    Metascore: { type: String },
    imdbRating: { type: String },
    imdbVotes: { type: String },
    imdbID: { type: String, required: true },
    Type: { type: String, required: true },
    DVD: { type: String },
    BoxOffice: { type: String },
    Production: { type: String },
    Website: { type: String },
    Response: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: String,
    director: String,
    origin: String,
    source: {
        type: [String], // e.g., 'criterion', 'mubi'
    },
    omdbData: { type: [omdbDataSchema], default: {} },
    watched: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

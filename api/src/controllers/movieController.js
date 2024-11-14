const Movie = require('../models/Movie');
const { scrapeCriterion, scrapeMubi } = require('../scraper');
const getMovieDetailsFromOMDB = require('../omdbService');

const getMovies = async (req, res) => {
    try {
        console.log('Fetching movies from the database...');
        const movies = await Movie.find();
        console.log(`Retrieved ${movies.length} movies.`);
        res.json(movies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
};

const syncMovies = async (req, res) => {
    console.log('Starting movie synchronization...');
    try {
        let mubiMovies = [];
        // try {
        //   console.log("Scraping Mubi...");
        //   mubiMovies = await scrapeMubi();
        //   console.log(`Scraped ${mubiMovies.length} movies from Mubi.`);
        // } catch (error) {
        //   console.error("Error scraping Mubi:", error);
        // }

        let criterionMovies = [];
        try {
            console.log('Scraping Criterion...');
            criterionMovies = await scrapeCriterion();
            console.log(`Scraped ${criterionMovies.length} movies from Criterion.`);
        } catch (error) {
            console.error('Error scraping Criterion:', error);
        }

        const allMovies = [...criterionMovies, ...mubiMovies];
        console.log(`Total movies to process: ${allMovies.length}`);
        console.log('----------------------------------------------------------');
        console.log('|   No.   |        Title        |    Source    |   Status   |');
        console.log('----------------------------------------------------------');

        let movieCount = 1;

        for (const movie of allMovies) {
            let status = '';

            try {
                // Search for data on OMDB
                const omdbDetails = await getMovieDetailsFromOMDB(movie.title, movie.year);

                if (omdbDetails && omdbDetails.imdbID) {
                    // If OMDB data is found, find the record by IMDb ID
                    let existingMovie = await Movie.findOne({
                        imdbID: omdbDetails.imdbID,
                    });

                    if (!existingMovie) {
                        // Persist the movie with OMDB data
                        const newMovie = new Movie({
                            ...movie,
                            omdbData: omdbDetails,
                            source: [movie.source], // Initialize source as an array
                        });
                        await newMovie.save();
                        status = 'Saved with OMDB data';
                    } else {
                        // Check if the source is already in the record, if not, add it
                        if (!existingMovie.source.includes(movie.source)) {
                            existingMovie.source.push(movie.source);
                        }
                        existingMovie.active = true;
                        await existingMovie.save();
                        status = 'Updated with new source';
                    }
                } else {
                    // If OMDB data is not found, find the record by title and year without OMDB data
                    let existingMovie = await Movie.findOne({
                        title: movie.title,
                        year: movie.year,
                        omdbData: { $exists: false },
                    });

                    if (!existingMovie) {
                        // Persist the movie with source data only
                        const newMovie = new Movie({
                            ...movie,
                            omdbData: null,
                            source: [movie.source], // Initialize source as an array
                        });
                        await newMovie.save();
                        status = 'Saved without OMDB data';
                    } else {
                        // Check if the source is already in the record, if not, add it
                        if (!existingMovie.source.includes(movie.source)) {
                            existingMovie.source.push(movie.source);
                        }
                        existingMovie.active = true;
                        await existingMovie.save();
                        status = 'Updated with new source';
                    }
                }
            } catch (error) {
                console.error(`Error processing movie: ${movie.title}`, error);
                status = 'Error';
            }

            // Print each log entry as a row in the table
            console.log(
                `| ${String(movieCount).padEnd(6)} | ${movie.title.padEnd(18)} | ${movie.source.padEnd(
                    12,
                )} | ${status.padEnd(20)} |`,
            );
            movieCount++;
        }

        console.log('----------------------------------------------------------');

        console.log('Inactivating movies not in the scraped data...');
        const scrapedTitles = allMovies.map((m) => m.title);
        const result = await Movie.updateMany({ title: { $nin: scrapedTitles } }, { active: false });
        console.log(`Movies inactivated: ${result.nModified || 0}`);

        res.json({ message: 'Movies updated successfully' });
    } catch (error) {
        console.error('Error updating movies:', error);
        res.status(500).json({ message: 'Error updating movies', error });
    }
};

const patchMovie = async (req, res) => {
    const { id } = req.params;
    console.log(`Updating movie with ID: ${id}`);
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            console.warn(`Movie not found with ID: ${id}`);
            return res.status(404).json({ message: 'Movie not found' });
        }

        console.log(`Updating watched status for movie: ${movie.title}`);
        movie.watched = req.body.watched;
        await movie.save();
        console.log(`Movie updated: ${movie.title}`);
        res.json({ message: 'Movie updated successfully', movie });
    } catch (error) {
        console.error(`Error updating movie with ID: ${id}`, error);
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

module.exports = {
    getMovies,
    syncMovies,
    patchMovie,
};

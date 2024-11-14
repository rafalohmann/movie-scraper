const axios = require('axios');
require('dotenv').config();

const getMovieDetailsFromOMDB = async (title, year) => {
    try {
        const { data } = await axios.get(`http://www.omdbapi.com`, {
            params: {
                t: title,
                y: year,
                apikey: process.env.OMDB_API_KEY,
            },
        });
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error('Error fetching data from OMDB:', error);
        return null;
    }
};

module.exports = getMovieDetailsFromOMDB;

const express = require('express');
const router = express.Router();

const{
    searchMovies,
    getMovieByImdbId,
    getAllMovies,
    getMovie,
    getPopularMovies,
    deleteMovie,
    textSearch
} = require('../controllers/movieController');

//search and retriev routes

router.get('/search',searchMovies);
router.get('/text-speach',textSearch);
router.get('/popular',getPopularMovies);
router.get('/imdb/:imdbId',getMovieByImdbId);
router.get('/',getAllMovies);
router.get('/:id',getMovie);

//Delete route
router.delete('/:id', deleteMovie);

module.exports = router;
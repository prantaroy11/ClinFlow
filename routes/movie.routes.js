const movieController=require('../controllers/movie.controller');
const movieMiddlewares=require('../middlewares/movie.middlewares');
const authMiddlewares=require('../middlewares/auth.middlewares');

/// All the routes related to movie will be defined in this file

const routers=(app)=>{
    app.post('/mba/api/v1/movies',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );
    app.delete('/mba/api/v1/movies/:id',movieController.deleteMovie);
    app.get('/mba/api/v1/movies/:id',movieController.getMovie);
    app.put('/mba/api/v1/movies/:id',movieController.updateMovie);
    app.patch('/mba/api/v1/movies/:id',movieController.updateMovie);
    app.get('/mba/api/v1/movies',movieController.getMovies);
}

module.exports=routers;
const theatreController=require('../controllers/theatre.controller');
const theatreMiddlewares=require('../middlewares/theatre.middleware');

/// All the routes related to theatre will be defined in this file
const routes=(app)=>{
    app.post('/mba/api/v1/theatres',theatreMiddlewares.validateTheatreCreateRequest,theatreController.create);
    app.delete('/mba/api/v1/theatres/:id',theatreMiddlewares.validateTheatreId,theatreController.destroy);
    app.get('/mba/api/v1/theatres/:id',theatreMiddlewares.validateTheatreId,theatreController.getTheatre);
    app.get('/mba/api/v1/theatres',theatreController.getAllTheatres);
    app.patch('/mba/api/v1/theatres/:id',theatreMiddlewares.validateTheatreId,theatreController.updateTheatre);
    app.put('/mba/api/v1/theatres/:id',theatreMiddlewares.validateTheatreId,theatreMiddlewares.validateTheatreCreateRequest,theatreController.updateTheatre);
    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddlewares.validateTheatreId,theatreMiddlewares.validateUpdateMovies,theatreController.updateMoviesInTheatres);
    app.get('/mba/api/v1/theatres/:id/movies',theatreMiddlewares.validateTheatreId,theatreController.getMovies);
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId',theatreController.checkMovie);
}


module.exports=routes;

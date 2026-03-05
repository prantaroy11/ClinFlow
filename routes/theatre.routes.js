const theatreController=require('../controllers/theatre.controller');
const theatreMiddlewares=require('../middlewares/theatre.middleware');

/// All the routes related to theatre will be defined in this file
const routes=(app)=>{
    app.post('/mba/api/v1/theatres',theatreMiddlewares.validateTheatreCreateRequest,theatreController.create);
    app.delete('/mba/api/v1/theatres/:id',theatreController.destroy);
    app.get('/mba/api/v1/theatres/:id',theatreController.getTheatre);
    app.get('/mba/api/v1/theatres',theatreController.getAllTheatres);
    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddlewares.validateUpdateMovies,theatreController.updateMoviesInTheatres);
}


module.exports=routes;

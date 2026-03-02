const MovieController=require('../controllers/movie.controller');

const routers=(app)=>{
    app.post('/mba/api/v1/movies',MovieController.createMovie);
}

module.exports=routers;
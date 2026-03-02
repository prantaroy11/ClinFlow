const Movie = require('../models/movie.model');

const createMovie=async(data)=>{
    const movie=await Movie.create(data);
    return movie;
}

const deleteMovie=async(id)=>{
     const response=await Movie.deleteOne({_id:id});
     return response;
}

const getMovie=async(id)=>{
    const movie=await Movie.findById(id);
    if(!movie){
        return{
            error:"No movie found with the corresponding name",
            code:404
        }
    }

    return movie;

}

module.exports={
    getMovie,
    createMovie,
    deleteMovie
}
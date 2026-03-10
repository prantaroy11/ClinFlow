const Movie = require('../models/movie.model');
const {STATUS}=require('../utils/constants');

/**
 * 
 * @param  data -> contains the details of the movie to be created
 * @returns ->returns the new movie object created
 */

const createMovie=async(data)=>{
    try{
        const movie=await Movie.create(data);
        return movie;
    }catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            });
            throw {err:err,code:STATUS.UNPROCESSABLE_ENTITY};
        }else{
            throw error;
        }
    }
}

/**
 * @param  id -> id of the movie to be deleted
 * @returns -> returns the response of the delete operation
 */

const deleteMovie=async(id)=>{
     try{
        const response=await Movie.findByIdAndDelete(id);
        if(!response){
            throw{
                err:"No movie found with the corresponding id", 
                code:STATUS.NOT_FOUND
            }
        }       
        return response;
     }catch(error){
        throw error;    
     }
}
/**
 * 
 * @param  id -> id of the movie to be fetched
 * @returns -> returns the movie object if found, otherwise returns an error
 */
const getMovie=async(id)=>{
    const movie=await Movie.findById(id);
    if(!movie){
        return{
            error:"No movie found with the corresponding id",
            code:404
        }
    }

    return movie;

}

/**
 * 
 * @param  id -> id of the movie to be updated
 * @param  data -> contains the updated details of the movie
 * @returns -> returns the updated movie object
 */
const updateMovie=async(id,data)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(id,data,{new:true,runValidators:true});
        return movie;
    }catch(error){
         if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            });
            return {err:err,code:422};
        }else{
            throw error;
        }
    }
}

/**
 * 
 * @param  filter -> contains the filter criteria for fetching movies
 * @returns -> returns the list of movies that match the filter criteria
 */
const fetchMovies=async(filter)=>{
    let query={};
    if(filter.name){
        query.name=filter.name;
    }

    let movies=await Movie.find(query);
    if(!movies){
        return{
            err:"No movies found with the corresponding name",
            code:404
        }
    }
    return movies;
}

module.exports={
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}
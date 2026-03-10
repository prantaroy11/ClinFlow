const Theatre=require('../models/theatre.model');
const Movie=require('../models/movie.model');
const {STATUS}=require('../utils/constants');

/**
 * 
 * @param  data -> contains the details of the theatre to be created
 * @returns -> returns the new theatre object created
 */
const createTheatre=async(data)=>{
    try{
        const theatre=await Theatre.create(data);
        return theatre;
    }catch(err){
        if(err.name=="ValidationError"){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });
            throw {err:error,code:STATUS.UNPROCESSABLE_ENTITY};
        }else{
            throw err;
        }
    }
}

/**
 * 
 * @param  id -> id of the theatre to be deleted
 * @returns -> returns the response of the delete operation
 */
const deleteTheatre=async(id)=>{
    try{
        const response=await Theatre.deleteOne({_id:id});
        if(!response){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

/**
 * 
 * @param  id -> id of the theatre to be fetched
 * @returns -> returns the theatre object if found, otherwise returns an error
 */
const getTheatre=async(id)=>{
    try{
        const theatre=await Theatre.findById(id);
        if(!theatre){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        return theatre;
    }catch(err){
        throw err;
    }

}
/**
 * 
 * @returns ->return all the theatre
 */
const getAllTheatres=async(data)=>{
    try{
        let query={};
        let pagination={};
        if(data && data.city){
            query.city=data.city;
        }
        if(data && data.pinCode){
            query.pinCode=data.pinCode;
        }
        if(data && data.name){
            query.name=data.name;
        }

        if(data && data.movieId){
            query.movies={$all: data.movieId};
        }

        if(data && data.limit){
            pagination.limit=Number(data.limit);
        }
        if(data && data.skip){
            let perPage=(data.limit)?data.limit:5;
            pagination.skip=Number(data.skip) * perPage;
        }
        const theatres=await Theatre.find(query,{},pagination);
        return theatres;
    }catch(err){
        throw err;
    }
}
/**
 * 
 * @param theatreId -> id of the theatre whose movies are to be updated
 * @param movieIds -> array of movie ids to be added or removed from the theatre
 * @param insert -> boolean value indicating whether the movies are to be added or removed from the theatre
 * @returns -> returns the updated theatre object if the update is successful, otherwise returns an error
 */
const updateMoviesInTheatres=async(theatreId,movieIds,insert)=>{
    try{
        if(insert){
            await Theatre.updateOne(
                {_id:theatreId},
                {$addToSet:{movies:{$each:movieIds}}}
            );
        }else{
            await Theatre.updateOne(
                {_id:theatreId},
                {$pull:{movies:{$in:movieIds}}}
            );
        }

        const theatre=await Theatre.findById(theatreId);
        return theatre.populate('movies');

    }catch(err){
        if(err.name=="TypeError"){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        throw err;
    }
}

const updateTheatre=async(id,data)=>{
    try{
        const response=await Theatre.findByIdAndUpdate(id,data,{returnDocument: "after",runValidators:true});
        if(!response){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        return response;
    }catch(error){
        if(error.name=="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            });
            return {err:err,code:422};
        }
        throw error;
    }
}

const getMoviesInTheatre=async(id)=>{
    try{
        const theatre=await Theatre.findById(id,{name:1,movies:1,address:1}).populate('movies');
        if(!theatre){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        return theatre;
    }catch(err){
        throw err;
    }
}

const checkMovieInTheatre=async(theatreId,movieId)=>{
    try{
        const response=await Theatre.findOne({_id:theatreId,movies:movieId});
        if(!response){
            return{
                err:"Movie not found in the theatre with the corresponding ids",
                code:404
            }
        }
        return response.populate('movies');
    }catch(err){
            throw err;
    }
}

module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres,
    updateTheatre,
    getMoviesInTheatre,
    checkMovieInTheatre

}
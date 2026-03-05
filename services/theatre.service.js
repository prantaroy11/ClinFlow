const Theatre=require('../models/theatre.model');

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
            return {err:error,code:422};
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
        if(data && data.city){
            query.city=data.city;
        }
        if(data && data.pinCode){
            query.pinCode=data.pinCode;
        }
        if(data && data.name){
            query.name=data.name;
        }
        const theatres=await Theatre.find(query);
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
    const theatre=await Theatre.findById(theatreId);
    if(!theatre){
        return{
            err:"No theatre found with the corresponding id",
            code:404
        }
    }

    if(insert){
        movieIds.forEach((movieId)=>{
            if(!theatre.movies.includes(movieId)){
                theatre.movies.push(movieId);
            }
        });
    }else{
       theatre.movies=theatre.movies.filter(movieId=>!movieIds.includes(movieId.toString()));
    }
    await theatre.save();
    return theatre;
}

module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres

}
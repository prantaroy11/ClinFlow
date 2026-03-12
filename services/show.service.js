const Show=require('../models/show.models');
const Theatre=require('../models/theatre.model');
const {STATUS}=require('../utils/constants');

const createShow=async(data)=>{
    try{
        const theatre=await Theatre.findById(data.theatreId);
        if(!theatre){
            throw{
                err:"No theatre found",
                code:STATUS.NOT_FOUND
            }
        }

        if(theatre.movies.indexOf(data.movieId)==-1){
            throw{
                err:"Movie is not currently available",
                code:STATUS.UNPROCESSABLE_ENTITY
            }
        }
        const response=await Show.create(data);
        return response;
    }catch(err){
        if(err.name=="ValidationError"){
            let error={};

            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });

            throw{
                err:error,
                code:STATUS.UNPROCESSABLE_ENTITY
            }
        }
        throw err;
    }
}

module.exports={
    createShow,
}
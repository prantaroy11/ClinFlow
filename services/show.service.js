const Show=require('../models/show.models');
const Theatre=require('../models/theatre.model');
const { findByIdAndUpdate } = require('../models/user.model');
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

const getShows=async(data)=>{
    try{
        let filter={};

        if(data.theatreId){
            filter.theatreId=data.theatreId;
        }

        if(data.movieId){
            filter.movieId=data.movieId;
        }

        const response=await Show.find(filter);

        if(!response){
            throw{
                err:"No shows found",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

const deleteShow=async(id)=>{
    try{
        const response=await Show.findByIdAndDelete(id);
        if(!response){
            throw{
                err:"No show find with the id",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

const updateShow=async(id,data)=>{
    try{
        const response=await Show.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!response){
            throw{
                err:"No show found for the given id",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        if(err.name=='ValidationError'){
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
    getShows,
    deleteShow,
    updateShow
    
}
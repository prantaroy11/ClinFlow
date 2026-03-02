const Movie=require('../models/movie.model');
const movieService=require('../services/movie.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');


const createMovie=async(req,res)=>{
    try{
        const movie=await movieService.createMovie(req.body);
        successResponseBody.data=movie;
        successResponseBody.message="Successfully created the movie";
        return res.status(201).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

const deleteMovie=async(req,res)=>{
    try{
        const response=await movieService.deleteMovie(req.params.id);

        successResponseBody.data=response;
        successResponseBody.message="Successfully deleted the movie";
        return res.status(200).json(successResponseBody);
    }catch(err){
        return res.status(500).json(errorResponseBody);
    }
}

const getMovie=async(req,res)=>{
    try{
        const response=await movieService.getMovie(req.params.id);
        if(response.error){
            errorResponseBody.error=response.code;
            errorResponseBody.message=response.error;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data=response;
        return res.status(200).json(successResponseBody);
    }catch(err){
        return res.status(500).json({errorResponseBody});
    }
}

module.exports={
    createMovie,
    deleteMovie,
    getMovie
}
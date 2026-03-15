const theatreService=require('../services/theatre.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const {STATUS}=require('../utils/constants')

const create=async(req,res)=>{
    try{
        const response=await theatreService.createTheatre({...req.body,owner:req.user});
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy=async(req,res)=>{
    try{
        const response=await theatreService.deleteTheatre(req.params.id);
        successResponseBody.data=response;
        successResponseBody.message="Successfully deleted the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatre=async(req,res)=>{
    try{
        const response=await theatreService.getTheatre(req.params.id);
        successResponseBody.data=response;
        successResponseBody.message="Successfully fetched the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllTheatres=async(req,res)=>{
    try{
        const response=await theatreService.getAllTheatres(req.query);
        if(response.length==0){
            errorResponseBody.error="No theatres found";
            errorResponseBody.code=STATUS.NOT_FOUND;
            errorResponseBody.message="No theatres found";
            return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully fetched all theatres";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMoviesInTheatres=async(req,res)=>{
    try{
        const response=await theatreService.updateMoviesInTheatres(req.params.id,req.body.movieIds,req.body.insert);
        successResponseBody.data=response;
        successResponseBody.message="Successfully updated the movies of the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateTheatre=async(req,res)=>{
    try{
        const response=await theatreService.updateTheatre(req.params.id,req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully updated the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            return res.status(response.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies=async(req,res)=>{
    try{
        const response=await theatreService.getMoviesInTheatre(req.params.id);
        successResponseBody.data=response;
        successResponseBody.message="Successfully fetched the movies in the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);    
    }
}

const checkMovie=async(req,res)=>{
    try{
        const response=await theatreService.checkMovieInTheatre(req.params.theatreId,req.params.movieId);
        successResponseBody.data=response;
        successResponseBody.message="Movie found in the theatre";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports={
    create,
    destroy,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres,
    updateTheatre,
    getMovies,
    checkMovie
}
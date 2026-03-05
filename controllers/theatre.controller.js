const theatreService=require('../services/theatre.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');

const create=async(req,res)=>{
    try{
        const response=await theatreService.createTheatre(req.body);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            errorResponseBody.message="Validation error";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the theatre";
        return res.status(201).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

const destroy=async(req,res)=>{
    try{
        const response=await theatreService.deleteTheatre(req.params.id);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully deleted the theatre";
        return res.status(200).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

const getTheatre=async(req,res)=>{
    try{
        const response=await theatreService.getTheatre(req.params.id);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            errorResponseBody.message="Validation error";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully fetched the theatre";
        return res.status(200).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

const getAllTheatres=async(req,res)=>{
    try{
        const response=await theatreService.getAllTheatres(req.query);
        if(response.length==0){
            errorResponseBody.error="No theatres found";
            errorResponseBody.code=404;
            errorResponseBody.message="No theatres found";
            return res.status(404).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully fetched all theatres";
        return res.status(200).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

const updateMoviesInTheatres=async(req,res)=>{
    try{
        const response=await theatreService.updateMoviesInTheatres(req.params.id,req.body.movieIds,req.body.insert);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully updated the movies of the theatre";
        return res.status(200).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports={
    create,
    destroy,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres
}
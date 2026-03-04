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
            errorResponseBody.message="Validation error";
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

module.exports={
    create,
    destroy,
    getTheatre
    
}
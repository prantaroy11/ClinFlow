const showService=require('../services/show.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const {STATUS}=require('../utils/constants');

const create=async(req,res)=>{
    try{
        const response=await showService.createShow(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the show";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getShows=async(req,res)=>{
    try{
        const response=await showService.getShows(req.query);
        successResponseBody.message="Successfully fetched the movie shows";
        successResponseBody.data=response;
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

const destroy=async(req,res)=>{
    try{
        const response=await showService.deleteShow(req.params.id);
        successResponseBody.data=response;
        successResponseBody.message="Successfully deleted the show";
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

const update=async(req,res)=>{
    try{
        const response=await showService.updateShow(req.params.id,req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully updated the show";
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
    getShows,
    destroy,
    update
}
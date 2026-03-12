const showService=require('../services/show.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const {STATUS}=require('../utils/constants');

const create=async(req,res)=>{
    try{
        const response=await showService.createShow(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the show";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports={
    create,
}
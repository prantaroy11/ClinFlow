const {STATUS}=require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const ObjectId=require('mongoose').Types.ObjectId;

const validateCreateShowRequest=async(req,res,next)=>{
    if(!req.body.theatreId){
        errorResponseBody.error="No theatre provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.error="Invalid theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.movieId){
        errorResponseBody.error="No movie provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error="Invalid movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.timing){
        errorResponseBody.error="No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.noOfSeats){
        errorResponseBody.error="No seat info provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.price){
        errorResponseBody.error="No price info provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}


module.exports={
    validateCreateShowRequest,
}
const {STATUS,USER_ROLE,BOOKING_STATUS}=require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const ObjectId=require('mongoose').Types.ObjectId;

const theatreService=require('../services/theatre.service');
const userService=require('../services/user.service');

const validateBookingCreateRequest=async(req,res,next)=>{
    if(!req.body.theatreId){
        errorResponseBody.error="No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.error="Invalid theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const theatre=await theatreService.getTheatre(req.body.theatreId);
    if(!theatre){
        errorResponseBody.error="No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    if(!req.body.movieId){
        errorResponseBody.error="No movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error="Invalid movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(theatre.movies.indexOf(req.body.movieId)==-1){
        errorResponseBody.error="Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // if(!theatre.timings.includes(req.body.timing)){
    //     errorResponseBody.error="Invalid show timing";
    //     return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    // }

    if(!req.body.timing){
        errorResponseBody.error="No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.noOfSeats){
        errorResponseBody.error="No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const canChangeStatus=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    console.log(user);

    if(user.userRole==USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled){
        errorResponseBody.error="You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

module.exports={
    validateBookingCreateRequest,
    canChangeStatus
}
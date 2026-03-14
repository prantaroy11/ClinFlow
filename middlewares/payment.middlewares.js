const {STATUS}=require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const ObjectId=require('mongoose').Types.ObjectId;


const verifyPaymentCreateRequest=async(req,res,next)=>{
    if(!req.body.bookingId){
        errorResponseBody.error="No booking id received";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        errorResponseBody.error="Invalid booking id";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

module.exports={
    verifyPaymentCreateRequest,
}
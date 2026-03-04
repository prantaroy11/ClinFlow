const { errorResponseBody } = require('../utils/responseBody');

const validateTheatreCreateRequest=(req,res,next)=>{
    if(!req.body.name){
        errorResponseBody.err="Name of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.city){
        errorResponseBody.err="City of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.pinCode){
        errorResponseBody.err="Pin code of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.address){
        errorResponseBody.err="Address of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports={
    validateTheatreCreateRequest
}